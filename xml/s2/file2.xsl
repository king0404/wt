<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
        <body>
            <h2>Employees with Salary > 5000</h2>
            <table border="1" cellpadding="5">
                <tr bgcolor="#cccccc">
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Department</th>
                    <th>Employee ID</th>
                </tr>

                <!-- Filter employees where salary > 5000 and sort by salary -->
                <xsl:for-each select="org/emp[sal &gt; 5000]">
                    <xsl:sort select="sal" data-type="number" order="ascending"/>
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
