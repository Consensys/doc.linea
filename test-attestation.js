// test-attestation-direct.js
const { ethers } = require('ethers');
const { VeraxSdk } = require('@verax-attestation-registry/verax-sdk');

// Configuration
const WALLET_PUBLIC_KEY = "0x2442446EaF5a0bac4750aa9633A99303e0717baa";
const WALLET_PRIVATE_KEY = "0x768a50871a9f3ce220e581b9889dd438fb0786ddb8e7f6310950d2f963e3c319";
const PORTAL_ADDRESS = "0xF494B93E9661333d0e7Ca1B880B9Aaf79Cb84697";
const SCHEMA_ID = "0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";

async function testVeraxAttestation() {
  try {
    console.log("Starting Verax attestation test...");
    
    // Initialize the Verax SDK
    const veraxSdk = new VeraxSdk(
      VeraxSdk.DEFAULT_LINEA_SEPOLIA,
      WALLET_PUBLIC_KEY,
      WALLET_PRIVATE_KEY
    );
    console.log("Verax SDK initialized for Linea Sepolia");
    
    // Step 1: Check if the schema exists
    try {
      const schemaInfo = await veraxSdk.schema.getSchema(SCHEMA_ID);
      console.log("Schema found:", JSON.stringify(schemaInfo, null, 2));
      console.log("Schema name:", schemaInfo.name);
      console.log("Schema description:", schemaInfo.description);
      console.log("Schema context:", schemaInfo.context);
      console.log("Schema structure:", schemaInfo.schema);
    } catch (schemaError) {
      console.error("Error fetching schema:", schemaError);
      throw new Error(`Schema not found. Please verify the schema ID: ${SCHEMA_ID}`);
    }
    
    // Step 2: Try to get all schemas to see if there's a matching one
    try {
      console.log("Fetching all schemas...");
      const schemas = await veraxSdk.schema.getSchemas();
      console.log(`Found ${schemas.length} schemas`);
      
      // Look for schemas with similar structure
      const similarSchemas = schemas.filter(schema => 
        schema.schema.includes("bool") && 
        schema.schema.includes("string") && 
        schema.schema.includes("address")
      );
      
      console.log("Similar schemas:", similarSchemas.map(s => ({
        id: s.id,
        name: s.name,
        schema: s.schema
      })));
      
      // Check if our schema ID is in the list
      const schemaExists = schemas.some(schema => schema.id === SCHEMA_ID);
      console.log(`Schema ID ${SCHEMA_ID} exists in the list: ${schemaExists}`);
    } catch (schemasError) {
      console.error("Error fetching all schemas:", schemasError);
    }
    
    // Step 3: Create a simple test attestation
    const testUrl = "http://test-url.com";
    const isPositive = true;
    
    // Create attestation data with the correct structure
    const abiCoder = new ethers.AbiCoder();
    
    // Try different encoding formats
    console.log("Trying different encoding formats...");
    
    // Format 1: Original format
    const encodedData1 = abiCoder.encode(
      ["bool", "string", "address"],
      [isPositive, testUrl, WALLET_PUBLIC_KEY]
    );
    console.log("Format 1 (bool, string, address):", encodedData1);
    
    // Format 2: Try with tuple
    const encodedData2 = abiCoder.encode(
      ["tuple(bool isPositive, string articlePage, address submitter)"],
      [[isPositive, testUrl, WALLET_PUBLIC_KEY]]
    );
    console.log("Format 2 (tuple):", encodedData2);
    
    // Format 3: Try with named parameters
    const encodedData3 = abiCoder.encode(
      ["bool isPositive", "string articlePage", "address submitter"],
      [isPositive, testUrl, WALLET_PUBLIC_KEY]
    );
    console.log("Format 3 (named parameters):", encodedData3);
    
    // Create the attestation request with format 1
    const attestationRequest = {
      schemaId: SCHEMA_ID,
      expirationDate: 0, // No expiration
      subject: WALLET_PUBLIC_KEY, // The subject is the user's address
      attestationData: encodedData1
    };
    
    console.log("Attestation request:", JSON.stringify(attestationRequest, null, 2));
    
    // Step 4: Submit the attestation
    try {
      console.log("Submitting attestation...");
      const result = await veraxSdk.portal.attest(
        PORTAL_ADDRESS,
        [attestationRequest],
        true // Wait for transaction validation
      );
      
      console.log("Attestation result:", JSON.stringify(result, null, 2));
      const transactionHash = result.transactionHash || result.hash || "unknown";
      console.log(`Attestation submitted successfully! TX: ${transactionHash}`);
    } catch (attestError) {
      console.error("Attestation submission error:", attestError);
      
      // Try to get more detailed error information
      if (attestError.error && attestError.error.message) {
        console.error("Error details:", attestError.error.message);
      }
      
      // Try with format 2
      try {
        console.log("Trying with format 2...");
        attestationRequest.attestationData = encodedData2;
        
        const result = await veraxSdk.portal.attest(
          PORTAL_ADDRESS,
          [attestationRequest],
          true
        );
        
        console.log("Format 2 worked! Result:", JSON.stringify(result, null, 2));
      } catch (format2Error) {
        console.error("Format 2 failed:", format2Error.message);
        
        // Try with format 3
        try {
          console.log("Trying with format 3...");
          attestationRequest.attestationData = encodedData3;
          
          const result = await veraxSdk.portal.attest(
            PORTAL_ADDRESS,
            [attestationRequest],
            true
          );
          
          console.log("Format 3 worked! Result:", JSON.stringify(result, null, 2));
        } catch (format3Error) {
          console.error("Format 3 failed:", format3Error.message);
          throw new Error(`All encoding formats failed for attestation submission`);
        }
      }
    }
    
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testVeraxAttestation().then(() => {
  console.log("Test completed");
}).catch(error => {
  console.error("Test failed with error:", error);
});