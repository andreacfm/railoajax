<cfparam name="form.name" default="" />
<cfparam name="form.address" default="" />
<cfparam name="form.phone" default="" />

<cfoutput>
	<div>
		<h4>The following info has been received on #now()#</h4>
		<ul>
			<li>Name : #form.name#</li>
			<li>Address : #form.address#</li>
			<li>Phone : #form.phone#</li>
		</ul>
	</div>
</cfoutput>