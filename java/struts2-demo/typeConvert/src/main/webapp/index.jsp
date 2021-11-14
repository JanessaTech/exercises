<%@ page language = "java" contentType = "text/html; charset = ISO-8859-1"
         pageEncoding = "ISO-8859-1"%>
<%@ taglib prefix = "s" uri = "/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <title>Hello World</title>
</head>

<body>
<h1>Please input environment and OS</h1>
<s:form action = "sys" method = "post">
    <s:textfield name = "name" label = "Name" size = "20" />
    <s:textfield name = "operatingSystem" label = "OS" size = "20" />
    <s:submit value="Submit" label = "Submit" align="center" />
</s:form>
</body>
</html>