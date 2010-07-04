<h2>CFMENU</h2>

<h3>Description</h3>
The current implementation is using the latest yui 2 libraries. See <a href="http://developer.yahoo.com/yui/menu/">yui menu</a>.</li>
<br />
Railo cfmenu supports these additional attributes;
<ul>
	<li>
		autosubmenudisplay (default is true, only applies to horizontal menus)
	</li>
	<li>
		hidedelay (default is 10)
	</li>
	<li>
		showdelay (default is 250)
	</li>
	<li>
		skin (default is 'yui-skin-sam')
	</li>
</ul>

<h3>Attributes</h3>
<br />
<table class="tbl">
<colgroup>
	<col width="150" />
	<col width="50" />
	<col width="50" />
	<col width="450" />
</colgroup>
<tr>
	<td class="tblHead">Name</td>
	<td class="tblHead">Type</td>
	<td class="tblHead">Required</td>
	<td class="tblHead">Description</td>
</tr>
<tr>
	<td class="tblContent">childstyle</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Style properties for ALL child menuitems (li element), example: childstyle="display:none".&nbsp;</td>
</tr>
<tr>
	<td class="tblContent">bgcolor</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Menu background color.&nbsp;</td>
</tr>
<tr>
	<td class="tblContent">font</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Menu font face. &nbsp;</td>
</tr>
<tr>
	<td class="tblContent">fontcolor</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Menu font color. &nbsp;</td>
</tr>
<tr>
	<td class="tblContent">fontsize</td>
	<td class="tblContent">numeric</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Menu font size (integer), example: fontsize="13".&nbsp;</td>
</tr>
<tr>
	<td class="tblContent">menustyle</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Style properties for the menu (div element), example: menustyle="display:none".&nbsp;</td>
</tr>
<tr>
	<td class="tblContent">name</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Menu name (div id). Ensure menu names are unique per-page.&nbsp;</td>
</tr>
<tr>
	<td class="tblContent">selectedfontcolor</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Font color of menu item on hover.&nbsp;</td>
</tr>
<tr>
	<td class="tblContent">selecteditemcolor</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Background color of menu item on hover.&nbsp;</td>
</tr>
<tr>
	<td class="tblContent"><em>skin</em></td>
	<td class="tblContent"><em>string</em></td>
	<td class="tblContent"><em>No</em></td>
	<td class="tblContent"><em>Default is 'yui-skin-sam', only yui skins supported at this stage.&nbsp;</em></td>
</tr>
<tr>
	<td class="tblContent">type</td>
	<td class="tblContent">string</td>
	<td class="tblContent">Yes</td>
	<td class="tblContent">horizontal | vertical&nbsp;</td>
</tr>
<tr>
	<td class="tblContent">width</td>
	<td class="tblContent">string</td>
	<td class="tblContent">No</td>
	<td class="tblContent">Integer or percentage, examples: width="150" or width="75%".&nbsp;</td>
</tr>
</table>

<br />
