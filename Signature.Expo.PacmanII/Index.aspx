<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="Entity_Manager" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <!-- Header -->
    <!--#include FILE="Includes/Header.inc" --> 

    <!-- Styles -->
    <link rel="stylesheet" href="Styles/Site.css" type="text/css" />
    <link rel="stylesheet" href="Styles/jquery-ui-1.10.0.min.css" type="text/css" />

    <!-- Script -->
    <script src="Scripts/jquery-1.9.0.js"></script>
    <script src="Scripts/jquery-ui-1.10.0.min.js"></script>
    <script src="Scripts/custom-script.js"></script>
    
    <!-- Title -->
    <title>Receipt Rewards</title>
</head>
<body>
<div id="MainCenter">
    <!-- Banner -->
    <!--#include FILE="Includes/Banner.inc" -->

    <!-- Main Content -->
    <form id="form1" runat="server">
        <!-- Survey Group Title -->
        <h1>Main Menu</h1>
        <hr class="pageTitle" />

        <!-- Links -->
        <h2>Links</h2>
        <a href="Code_Type_Manager.aspx">Code Type Manager</a> - Manage the codes used in the application<br /><br />
        <a href="Company_Manager.aspx">Company Manager</a> - Manage the all the surveys. Broke down by Company<br /><br />
    </form>
</div>
</body>
</html>