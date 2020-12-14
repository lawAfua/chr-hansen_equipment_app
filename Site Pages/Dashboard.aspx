<%@ Page Language="C#" masterpagefile="~masterurl/custom.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" title="Untitled 1" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content id="Content1" runat="Server" contentplaceholderid="PlaceHolderMain">
	<div style="height:25px"></div>
    <header>
        <div class="container" style="width: 70%;    text-align: center;">
            <div class="row pageSubHeader" style="">
                <div class="">
                    <h3 class="" style="color:white;font-size: 35px;">
                        Equipment Management System</h3>
                </div>
            </div>
        </div>
    </header>
  

    <div class="row" style="    margin-top: 6px;">
        <div class="col-sm-9" style="background-color:;"></div>
        <div class="col-sm-1" style="background-color:;margin-top: px;"><button type="button"
                id="ReportsRedirect" class="btn btn-primary">Reports</button></div>

        <div class="col-sm-2" style="background-color:;margin-left:-1% ;"><button type="button"
                id="NewInstrumentRedirect" class="btn btn-primary">Add Equipment</button></div>
    </div>
    

    <div style="height:12px"></div>
    
    <!-- The Modal -->
    	 <!-- Maintenance Schedule Details-->
	  <!-- Modal Structure -->

  <div class="modal fade" id="SafetyAssessmentDetails">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" id="modalHeading"></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" id="modalbody">
          
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
  
  
  
      <!-- The Modal -->
    	 <!-- Maintenance Schedule Details-->
	  <!-- Modal Structure -->
<div id="printDiv">
  <div class="modal fade" id="printlabelDetails">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" id="printlabelDetailsHeading"></h4>
          
           <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" id="printlabelDetailsbody">
          
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
        <input type="button" id="printData" class="btn btn-secondary" value="Print" />
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
 </div>

  
    	 <!-- RiskAssessment Details-->
	  <!-- Modal Structure -->

  <div class="modal fade" id="RiskAssessmentDetails">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" id="modalHeadingRiskAssessment"></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" id="RiskAssessmentmodalbody">
          
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>

  
  

    <div class="container">

        <ul class="nav nav-tabs" style="    margin-top: -12px;">
            <li class="active"><a data-toggle="tab" href="#activeInstruments"><b>Active Equipments</b></a></li>
            <li><a data-toggle="tab" href="#inactiveInstruments"><b>Inactive Equipments</b></a></li>
        </ul>

        <div class="tab-content">
            <div id="activeInstruments" class="tab-pane fade in active">
                <br />
                <div style="">
                    <table id="activeinstrumentsTable" class="display " style="width: 100%;">
                        <thead>
                            <tr>
                                <th>Eq. Id</th>
                                <th>Equipment Name</th>
                                <th>Model</th>
                                <th>Manufacturer</th>
                                <!--<th>Is Critical Instrument</th>
                                <th>PC Name</th>-->
                                
                                <th>Main Responsible Employee</th>
                                <th>S/A # for Equipments</th>
                                <th>S/A # for Modules</th>
                                <th class="printLabelClass">Print Label</th>
                                <th>Risk Assessment</th>
                                <th>Maintenance Schedule</th>
                                <th>View</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div id="inactiveInstruments" class="tab-pane fade in">
                <br />
                <div style="">
                    <table id="InactiveinstrumentsTable" class="display" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>Eq.Id</th>
                                <th>Equipment Name</th>
                                <th>Model</th>
                                <th>Manufacturer</th>
                                <th>Location</th>
                                <!--<th>Is Critical Instrument</th>
                                <th>PC Name</th>-->
                                
                                <th>Main Responsible Employee</th>
                                <th>S/A # for Equipments</th>
                                <th>S/A # for Modules</th>
                                <th class="printLabelClass">Print Label</th>
                                <th>Risk Assessment</th>
                                <th>Maintenance Schedule</th>
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

</asp:Content>
<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">
    <link rel="stylesheet" href="../SiteAssets/IMS/JS/bootstrap.min.css" />
    <link rel="stylesheet" href="../SiteAssets/IMS/JS/Style_Dashboard.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="../SiteAssets/IMS/JS/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../SiteAssets/IMS/JS/datatables.min.css" />
    <script type="text/javascript" src="../SiteAssets/IMS/JS/datatables.min.js"> </script>
    <script type="text/javascript" src="../SiteAssets/IMS/JS/IMSService.js"></script>
    <script type="text/javascript" src="../SiteAssets/IMS/JS/Dashboard.js"></script>
</asp:Content>