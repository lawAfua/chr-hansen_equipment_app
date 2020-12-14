<%@ Page Language="C#" masterpagefile="~masterurl/custom.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" title="Untitled 1" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content id="Content1" runat="Server" contentplaceholderid="PlaceHolderMain">
	<div style="height:25px"></div>
    <header>
        <div class="container" style="width: 70%;    text-align: center;">
            <div class="row pageSubHeader" style="">
                <div class="">
                    <h3 class="" style="color:white;font-size: 35px;">
                        Equipment Management System- Reports</h3>
                </div>
            </div>
        </div>
    </header>
    <br/>
    
   	 <div class="row">
   	 <div class="col-sm-6" style="    margin-right: -70px;"></div>

   	 <div class="col-sm-3" style=""><button type="button"
                id="DashboardRedirect" class="btn btn-primary">Goto Dashboard</button></div>
    </div>
    <br/>
    <div class="row">
    <div class="col-sm-3" style=""></div>
    <div class="col-sm-2" style=""> <label >Select Service Agreement Number:</label>  </div>
    <div class="col-sm-2" style="">
    	
      <select class="form-control" id="saNumbers">
        <option></option>
      </select>   
      </div>

    <div class="col-sm-3" id="SRnumberSearch" style="">    
    	<input type="button" id="SearchSANumber" class="btn btn-info" value="Search"/>
    </div>
    </div>


    <div style="height:12px"></div>
    
    <div class="container">

        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#Equipments">All Equipments<span class="badge" id="equipCount"></span></a></li>
            <li><a data-toggle="tab" href="#modules">All Modules <span class="badge" id="modCount"></span></a></li>
        </ul>

        <div class="tab-content">
            <div id="Equipments" class="tab-pane fade in active">
                <br />
                <div style="">
                    <table id="equipmentsTable" class="display " style="width: 100%;">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Equipment Name</th>
                                <th>Is Active?</th>
                                <th>Model</th>
                                <th>Manufacturer</th>
                                <th>Main Responsible Employee</th>
                                <th>S/A Number</th>
                                <th>View</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div id="modules" class="tab-pane fade in">
                <br />
                <div style="">
                    <table id="modulesTable" class="display" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Contact Person</th>
                                <th>Contract Company</th>
                                <th>Is Having Service Agreement</th>
                                <th>S/A Number</th>                                
                                <th>View</th>
                                <th>Edit</th>                               
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <iframe id="txtArea1" style="display:none"></iframe>

</asp:Content>
<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">
	<link href="../SiteAssets/IMS/JS/datatables.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../SiteAssets/IMS/JS/bootstrap.min.css" />
    <link rel="stylesheet" href="../SiteAssets/IMS/JS/Style_EMSReports.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="../SiteAssets/IMS/JS/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../SiteAssets/IMS/JS/datatables.min.css" />
    <script type="text/javascript" src="../SiteAssets/IMS/JS/datatables.min.js"> </script>
    <script type="text/javascript" src="../SiteAssets/IMS/JS/IMSService.js"></script>
    <script type="text/javascript" src="../SiteAssets/IMS/JS/EMSReports.js"></script>
</asp:Content>