<cfparam name="URL.output" default="extjs">
<cfscript>	
testSuite = createObject("component","mxunit.framework.TestSuite").TestSuite();
testSuite.addAll("test.TestAjaxBinder");
results = testSuite.run();
</cfscript>
<cfoutput>#results.getResultsOutput(URL.output,'railo-ajax/mxunit')#</cfoutput>
<!--- <p><hr /></p>
<p>Using CFDUMP against <code>mxunit.TestResult.getResults()</code> method</p>
<cfdump var="#results.getResults()#" label="MXUnit Sample Test Results" />
 --->