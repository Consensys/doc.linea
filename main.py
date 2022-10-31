# SPDX-License-Identifier: Apache-2.0


def define_env(env):
    "Hook function"

    # parameters are:
    # address: the address prefix
    # domain: the email domain, using "consensys.net" as default if not provided.
    @env.macro
    def email(address: str, domain: str = "consensys.net"):
        return "Send email at [{address}@{domain}](mailto:{address}@{domain})".format(
            address=address, domain=domain
        )

    # This is a demo macro that you can define for all your site
    @env.macro
    def color_block(value: str):
        return (
            '<span style="border:solid 1px black; border-right:none; '
            'display:inline-block;padding:0 0.5em; vertical-align: middle;">{value}</span>'
            '<span style="border:solid 1px black; background-color:{value};display:inline-block; '
            'padding:0 0.5em; vertical-align: middle; width:1.5em;">&nbsp;</span>'.format(
                value=value
            )
        )

    # This is a demo macro that you can define for all your site
    @env.macro
    def cli_to_env(name: str, prefix: str = ""):
        return (
            (prefix + ("_" if prefix else "") + name)
            .replace("--", "")
            .replace("-", "_")
            .upper()
        )

    # This is a demo filter that you can define for all your site
    @env.filter
    def code(code: str):
        return "`" + code + "`"
