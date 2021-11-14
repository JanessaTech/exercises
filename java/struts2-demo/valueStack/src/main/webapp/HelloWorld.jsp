<%@ page contentType = "text/html; charset = UTF-8" %>
<%@ taglib prefix = "s" uri = "/struts-tags" %>

<html>
<head>
    <title>Hello World</title>
</head>

<body>
Entered value : <s:property value = "name"/><br/>
Value of key 1 : <s:property value = "key1" /><br/>
Value of key 2 : <s:property value = "key2" /> <br/>
<h1>Check the internal structure of the valueStack</h1>
<s:debug></s:debug>
</body>
</html>