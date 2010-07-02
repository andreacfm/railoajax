<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="description" content="Railo is an Open Source ColdFusion Markup Language (CFML) engine and the fastest CFML engine available.">
	<meta name="keywords" content="Railo,ColdFusion,Cold Fusion,CFML,Free,Open Source">
	<meta name="generator" content="Sava CMS 5.1">
	<cfoutput>
		<title>#stMenu.title#</title>
		<link rel="icon" href="images/favicon.ico" type="image/x-icon">
		<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="assets/css/style.css" type="text/css" media="all">
		<link rel="stylesheet" href="assets/css/print.css" type="text/css" media="print">
		<cfloop array="#stMenu.css#" index="sStyle">
			<link rel="stylesheet" href="#sStyle#" type="text/css">
		</cfloop>
		<cfloop array="#stMenu.js#" index="sJS">
			<script type="text/javascript" src="#sJS#"></script>
		</cfloop>
	</cfoutput>
</head>
<body>
	<div id="wrap">

	<div id="header">
		<span id="slogan">Railo Ajax Demos</span>
	</div>
	
	<div id="header-logo">
		<cfoutput>
			<table cellpadding="10">
				<tr>
					<td><a href="index.cfm">Start</a></td>
				</tr>
			</table>
		</cfoutput>
	</div>
	
	<div id="sidebar">	
	<i>* = Included into Railo Core Engine</i>	
		<cfloop from="1" to="#arraylen(stLinks)#" index="el">		

			<cfoutput>
				<h1 onclick="toggleItems('_#el#');">#stLinks[el].name#</h1>			
				<div id="_#el#" class="left-box">
					<ul>
						<cfloop from="1" to="#arrayLen(stLinks[el].links)#" index="iEl">
							<cfif iEl eq 1>
								<cfset sClass = "first">
							<cfelseif iEl eq arraylen(stLinks)>
								<cfset sClass = "last">
							<cfelse>
								<cfset sClass = "">
							</cfif>
							<cfif structKeyExists(url, 'template') AND stLinks[el].links[iEl].url eq url.template>
								<li class="current"><a class="current" href="index.cfm?template=#stLinks[el].links[iEl].url#">#stLinks[el].links[iEl].name#</a></li>
							<cfelse>
								<li class="#sClass#"><a href="index.cfm?template=#stLinks[el].links[iEl].url#">#stLinks[el].links[iEl].name#</a></li>
							</cfif>
						</cfloop>
					</ul>
				</div>
			</cfoutput>
					
		</cfloop>

		<ul>
			<cfoutput>
				<li>&copy;#year(now())# Railo Technologies GmbH, Switzerland.</li>
				<li>&copy;#year(now())# Andrea Campolonghi.</li>			
			</cfoutput>		
		</ul>		
	</div>
	
	<div id="main">