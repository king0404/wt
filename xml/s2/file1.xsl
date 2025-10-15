<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
        <body>
            <h2>Employee List</h2>
            <table border="1" cellpadding="5">
                <tr>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Department</th>
                    <th>Employee ID</th>
                </tr>
                <xsl:for-each select="org/emp">
                    <tr>
                        <td><xsl:value-of select="name"/></td>
                        <td><xsl:value-of select="sal"/></td>
                        <td><xsl:value-of select="@dept"/></td>
                        <td><xsl:value-of select="@eid"/></td>

                    </tr>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
