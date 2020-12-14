<%@ Page Language="C#" masterpagefile="~masterurl/default.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" title="Untitled 1" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content id="Content1" runat="Server" contentplaceholderid="PlaceHolderMain">

    <header>
        <div class="container">
            <div class="row pageSubHeader" style="">
                <h3 class="center-align" style="color:white">New Equipment</h3>
            </div>
        </div>
    </header>

    <main>
        <div class="container ">
            <head>
<meta name="WebPartPageExpansion" content="full" />
</head>
            <form name="form1" id="myForm" method="post" action="">
                <div class="row" >
                    <div class="col s12 m6"></div>
                    <div id="preLoader" style="    margin-top: 182px;" class="preloader-wrapper big">
                        <div class="spinner-layer spinner-blue">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-red">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-yellow">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-green">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="FormContent">
                    <div class="row" id="">
                        <div class="input-field col s12 m4">
                            <i class="material-icons prefix">text_format</i>
                            <label>Equipment Name <Span class="red-text text-accent-4">
							*</Span></label>
                            <input   type="text" name="equipmentName" id="equipmentName" value="" required
                                class="validate mat-input" />
                        </div>
                        <div class="input-field col s12 m4">
                            <i class="material-icons prefix">device_hub</i>
                            <select class="mat-input" id="equipmentType">
                            	<option value="" selected>Choose your option</option>
                            </select>
                            <label>Equipment Type</label>
                        </div>
                        <div class="input-field col s12 m4">
                            <i class="material-icons prefix">store</i>
                            <label>Manufacturer <Span class="red-text text-accent-4">
							*</Span></label>
                            <input  type="text" name="manufacture" id="manufacture" value="" required class="validate  mat-input" />

                            <!--  <input placeholder="Event title" id="title" type="text" class="validate">
        <label for="title">Title</label>-->

                        </div>
                    </div>


                    <div class="row">
                    	<div class="input-field col s12 m4">
                        	<i class="material-icons prefix">devices_other</i>
                        	<input type="text" required id="model" class="validate mat-input"/>
          <label for="model">Model <Span class="red-text text-accent-4">*</Span> 
          </label>
          
                            
                            <!--<label>Model <Span class="red-text text-accent-4">*</Span></label>
                            <input type="text" name="model" id="model" value="" required class="validate" />-->
                        </div>
                        
                        <div class="input-field col s12 m4">
                        	<i class="material-icons prefix">edit_location</i>
                            <label>Location (Room Number)<Span class="red-text text-accent-4">*</Span></label>
                            <input   type="text" name="locationRoom" id="locationRoom" value="" required
                                class="validate  mat-input" />                            
                        </div>
                        <div class="input-field col s12 m4">
                            <i class="material-icons prefix">event</i>
                            <label>Manufacture Year<Span class="red-text text-accent-4">*</Span></label>
                            <input   type="text" name="manufactureYear" id="manufactureYear" value="" required
                                class="validate  mat-input" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12 m4" style="margin-top: 27px;">
                            <i class="material-icons prefix">important_devices</i>
                            <select class="mat-input" name="IsCriticalEquipemnt" id="IsCriticalEquipemnt"></select>
                            <label>Is Critical Equipment?</label>
                        </div>
                        <div class="input-field col s12 m4" style="margin-top: 27px;">
                            <i class="material-icons prefix">desktop_windows</i>
                            <select required class="validate" name="pcBackup" id="pcBackup">
                            	<option value="" disabled selected>Choose your option</option>
                                <!--<option value="" disabled selected>Choose your 
								option</option>-->
                            </select>
                            <label style="    margin-top: -15px;">
                            In Built PC<Span class="red-text text-accent-4">*</Span>&nbsp;&nbsp;&nbsp;<!--&nbsp<i style="font-size:21px;color: #837bfd;" class="material-icons tooltipped"  data-position="top" data-tooltip="Select PC name accordingly">help</i>--></label>
                            <!--<input type="text" placeholder="" required class="validate    mat-input" id="pcBackup" list="pcBackupDatalist"  />
							 <datalist id="pcBackupDatalist"></datalist>-->
                            
                        </div>
                        
                        <div class="input-field col s12 m4 pcClass">
                        	<div class="row">
                        		<div class="input-field col s12 m11">
		                            <i class="material-icons prefix">desktop_windows</i>
		                            <select required id="pC" name="pC">
		                            	<option value="" disabled selected>Choose your option</option>
		                            </select>
		                            <!--<input type="text"  id="pC" list="pCDatalist"  />
									 <datalist id="pCDatalist"></datalist>-->
									
		                            <label>PC Name<!--PC(Select NR if No PC attached)--><Span class="red-text text-accent-4">*</Span></label>
		                        </div>
		                        <div class="input-field col s12 m1">
		                            <span class="tooltipped" id="addPCNameManually" data-position="top" data-tooltip="Cannot find PC Name? Click on Add icon to add option" style="color: #837bfd;     margin-left: -15px;"><i style="font-size:30px;" class="material-icons "  data-position="top" data-tooltip="Cannot find PC Name? Click on Add icon to add option">add_circle_outline</i>&nbsp;</span>  
		                        </div>
							</div>
						</div>


                    </div>

                    <div class="row">
                        <div class="input-field col s12 m4">
                            <i class="material-icons prefix">person</i>
                            <input type="text" required id="responsibleEmployee" name="responsibleEmployee" class="autocomplete mat-input" />
                            <label for="responsibleEmployee">Main Responsible Employee<Span class="red-text text-accent-4">*</Span></label>
                        </div>
                        <div class="input-field col s12 m4">
                            <i class="material-icons prefix">person_pin</i>
                            <input type="text" id="backupResponsible" class="autocomplete mat-input" />
                            <label for="backupResponsible">Secondary Responsible Employee</label>
                        </div>
                        <div class="input-field col s12 m3">

                            <i class="material-icons prefix">label</i>
                            <label>Active<Span class="red-text text-accent-4">*</Span></label>

                        

                            <!-- Switch -->
                            <div class="switch" style="margin-top: 10px;margin-left: 110px;">
                                <label>
                                    No
                                    <input id="isActive" type="checkbox" checked/>
                                    <span class="lever"></span>
                                    Yes
                                </label>
                            </div>
                            </div>
							
	
                    </div>
                    
                    <div class="row">
                        <div class="input-field col s12 m4">
                        	<div class="row">
                        		<div class="input-field col s12 m11">
		                            <i class="material-icons prefix">dehaze</i>
		                            <select multiple class="mat-input" name="method" id="method" placeholder="gg">  
		                            	<option value="" disabled >Choose your option</option>                          	
		                            </select>
		                            <label>Method</label>
		                            <!--<input type="text" required class="validate   mat-input" id="method" list="methodDatalist"  />
									 <datalist id="methodDatalist"></datalist>-->                            
		                        </div>
		                        <div class="input-field col s12 m1">
		                            <span class="tooltipped" id="addMethodManually" data-position="top" data-tooltip="Cannot find Method? Click on Add icon to add option" style="color: #837bfd;     margin-left: -15px;"><i style="font-size:30px;" class="material-icons "  data-position="top" data-tooltip="Cannot find Method? Click on Add icon to add option">add_circle_outline</i>&nbsp;</span>  
		                        </div>
							</div>
						</div>
						
						<div class="input-field col s12 m4 AnalyticalApplianceClass"  style="margin-top: 27px;">
                            <i class="material-icons prefix">dehaze</i>
                            <select disabled multiple class="mat-input" id="MethodsUniqueToInstrument">                            	
                            </select>
                            <label>Methods Unique To Instrument&nbsp;&nbsp;&nbsp;&nbsp<i style="font-size:21px;color: #837bfd;" class="material-icons tooltipped"  data-position="top" data-tooltip="Automatically calculated based on uniqueness of selected Methods">help</i></label>                         
                        </div>
                        
                        <div class="input-field col s12 m4 AnalyticalApplianceClass" style="margin-top: 27px;">
                            <i class="material-icons prefix">important_devices</i>
                            <select disabled  required class="validate" id="criticalIstrument">                            
							 </select>
							<label>Critical Instrument<Span class="red-text text-accent-4">*</Span>&nbsp;&nbsp;&nbsp;&nbsp<i style="font-size:21px;color: #837bfd;" class="material-icons tooltipped"  data-position="top" data-tooltip="Automatically calculated based on uniqueness of selected Methods">help</i></label>
							 <!--<input type="text" required class="validate   mat-input" id="criticalIstrument" list="criticalIstrumentDatalist"  />
							 <datalist id="criticalIstrumentDatalist"></datalist>-->
                        </div>
                    </div>

                   	
                   									<div class="row">    
                                    <div class="input-field col s12 m4">    
			                            <i class="material-icons prefix">    
			 							confirmation_number</i>    
                                        <label>Installation Year </label>    
                                        <input  type="number" name="InstallationYear" id="InstallationYear" value="" class="validate  mat-input" />    
                                    </div>  
                                    <div class="input-field col s12 m4">
										<i class="material-icons prefix">   date_range</i>    
			                              <label>Risk Assessment Date</label>    
                                        <input type="text" id="riskAssessmentDate" class="datepicker  datefocus  mat-input"/> 			                                        
			                        </div>  
                                    <div class="input-field col s12 m4">   
                                       <i class="material-icons prefix">   
										comment</i>   
										<label for="textarea1">Comments</label>	   
                                        <textarea id="commentsI" class="materialize-textarea   mat-input"></textarea>   
            						</div>   
                                      
                                </div>                       
                                 <div class="row">  
                                 	<div class="input-field col s12 m4">    
                                        <i class="material-icons prefix">    
			 							content_paste</i>    
                                        <select required class="validate" name="isHavingServiceAgreement" id="isHavingServiceAgreementI">    
                                        </select>    
                                        <label>Is having Service Agreement?<Span class="red-text text-accent-4">*</Span></label>    
                                    </div>
                                 	<div class="input-field col s12 m4 contractGroupI">    
			                            <i class="material-icons prefix">    
			 							confirmation_number</i>    
                                        <label>Contract/Service Agreement#</label>    
                                        <input type="text" name="contractServiceAgreementNumber" id="contractServiceAgreementNumberI" value="" class="validate  mat-input" />    
                                    </div>    
                                        
                                    <div class="input-field col s12 m4 contractGroupI">    
                                        <i class="material-icons prefix">    
			 							functions<!--format_quote--><!--attach_money--></i>    
                                        <label>Price(In DKK)</label>    
                                        <input type="number" step='0.01' name="Price" class="  mat-input" id="Price" />    
                                    </div> 
                                      
                                     	
                                </div>    	
                                <div class="row">
                                	<div class="input-field col s12 m4 contractGroupI">    
                                        <i class="material-icons prefix">    
			 							account_box</i>    
                                        <label>Contact Person Name</label>    
                                        <input type="text" name="contactPersonName" class="  mat-input" id="contactPersonNameI" />    
                                    </div> 	    
                                    <div class="input-field col s12 m4 contractGroupI">    
                                        <i class="material-icons prefix">    
			 							contact_mail</i>    
                                        <label>Contact Person Email</label>    
                                        <input  type="email" name="contactPersonEmail" id="contactPersonEmailI" class="validate  mat-input" />    
                                        <span class="helper-text" data-error="Please enter valid Email ID" data-success=""></span>    
                                    </div>    
                                    <div class="input-field col s12 m4 contractGroupI">    
                                        <i class="material-icons prefix">    
			 							contact_phone</i>    
                                        <label>Contact Person Phone</label>    
                                        <input  type="number"  name="contactPersonPhone" id="contactPersonPhoneI" value="" class="validate  mat-input" />    
                                    </div>      
                                </div> 
                                <!--<div class="row">                                	
                                    <div class="input-field col s12 m2 contractGroupI">    
                                        <i class="material-icons prefix">    
			 							repeat</i>    
                                        <label>Frequency</label>    
                                        <input type="number" min="0" max="60" id="frequencyI" class="validate  mat-input" />  
                                    </div>
                                    <div class="input-field col s12 m6 contractGroupI">       
                                        <p class="range-field"><input type="range" id="freqMonthsSelector" min="0" max="36" /></p>  
                                    </div>     
                                </div>-->
                                
                                <div class="row">  
                                	<div class="input-field col s12 m4  contractGroupI" >    
                                        <i class="material-icons prefix">    
			 							date_range</i>    
			                              <label>Start Date</label>    
                                        <input type="text" id="renewalDateI" class="datepicker  datefocus  mat-input"/>    
                                    </div> 
                                                                  	
                                    <div class="input-field col s12 m2 contractGroupI">    
                                        <i class="material-icons prefix">    
			 							repeat</i>    
                                        <label>Frequency</label>    
                                        <input type="number" placeholder="0" min="0" max="60" id="frequencyI" class="validate  mat-input" />
                                    </div>
                                    <div class="input-field col s12 m1 contractGroupI" style="margin-left: -19px;">       
                                        <label>times in</label>  
                                    </div>
                                    <div class="input-field col s12 m1 contractGroupI" style="margin-left: -19px;">       
                                        <input type="number" placeholder="0" min="0" max="36" id="MaintenanceFreqMonthSelector" class="validate  mat-input" />  
                                    </div>
                                    <div class="input-field col s12 m1 contractGroupI"  style="margin-left: -19px;">       
                                        <label>month/s</label>  
                                    </div>	
                                    <div class="input-field col s12 m3 contractGroupI"  style="margin-left: -19px;">       
                                        <a data-position="top" data-tooltip="Select Start Date, Frequency and months for schedule details" class=" tooltipped btn waves-effect waves-light btn-medium z-depth-2" id="MaintenenceSchedule">
										Maintenence Schedule<i class="material-icons right">update</i></a>  
                                    </div>
                    			</div>
					<!--<div id="ModelsSection1">
					  <ul class="collapsible">
					    <li class="active">
					      <div class="collapsible-header"><i class="material-icons">
							devices_other</i>Model&nbsp;<span id="model_1"></span><span class="badge"><i class="material-icons">unfold_less</i></span></div>
					      <div class="collapsible-body">
					      		<div class="row" id="">
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										text_format</i>
			                            <label>Model Name <Span class="red-text text-accent-4">
										*</Span></label>
			                            <input type="text" name="modelName" id="modelName" value="" required
			                                class="validate" />
			                        </div>
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										account_balance</i>
			                            <label>Contract Company <Span class="red-text text-accent-4">
										*</Span></label>
			                            <input type="text" name="contractCompany" id="contractCompany" value="" required class="validate" />
			                        </div>
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										store</i>
			                            <label>Model Manufacture <Span class="red-text text-accent-4">
										*</Span></label>
			                            <input type="text" name="modelManufacture" id="modelManufacture" value="" required class="validate" />
			
			                          			
			                        </div>
			                    </div>
			                    
			                    
			                    <div class="row">
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										content_paste</i>
			                            <select required class="validate" name="isHavingServiceAgreement" id="isHavingServiceAgreement">
			                            </select>
			                            <label>Is having Service Agreement?<Span class="red-text text-accent-4">*</Span></label>
			                        </div>
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										repeat</i>
			                            <select class="validate" name="frequency" id="frequency">
												 <option value="" disabled selected>
													Choose your option</option>

			                            </select>
			                            <label>Frequency<Span class="red-text text-accent-4">*</Span></label>
			                        </div>
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										confirmation_number</i>
			                            <label>Serial Number<Span class="red-text text-accent-4">*</Span></label>
			                            <input type="text" name="serialNumber" id="serialNumber" value="" required class="validate" />
			                        </div>
			                    </div>
			                    
			                     <div class="row">
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										date_range</i>
			                            <input type="text" id="renewalDate" class="datepicker"/>
			                            <label>Renewal Date<Span class="red-text text-accent-4">*</Span></label>
			                        </div>
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										account_box</i>
			                            <label>Contact Person Name<Span class="red-text text-accent-4">*</Span></label>
			                            <input type="text" name="contactPersonName" id="contactPersonName" />
			                        </div>
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										confirmation_number</i>
			                            <label>Contract/Service Agreement#<Span class="red-text text-accent-4">*</Span></label>
			                            <input type="text" name="contractServiceAgreementNumber" id="contractServiceAgreementNumber" value="" required class="validate" />
			                        </div>
			                    </div>
			                    
			                     <div class="row">
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										contact_mail</i>
			                            <label>Contact Person Email<Span class="red-text text-accent-4">*</Span></label>
			                            <input  type="email" name="contactPersonEmail" id="contactPersonEmail" class="validate" />
			                            <span class="helper-text" data-error="Please enter valid Email ID" data-success="right"></span>
			                        </div>
			                        <div class="input-field col s12 m4">
			                            <i class="material-icons prefix">
										contact_phone</i>
			                            <label>Contact Person Phone<Span class="red-text text-accent-4">*</Span></label>
			                            <input type="number" name="contactPersonPhone" id="contactPersonPhone" value="" required class="validate" />
			                        </div>
			                        
			                    </div>
			                    
			                    <div class="row">			                        
			                        <div class="input-field col s12 m12">
			                            <i class="material-icons prefix">
										comment</i>
			                            <textarea id="comments" class="materialize-textarea"></textarea>
          								<label for="textarea1">Comments</label>		
          							</div>
			                    </div>


					      </div>
					    </li>
					  </ul>		
					</div>	-->		


                    <!--<div class="row">
					      <div class="card-panel teal">
					        <span class="white-text">I am a very simple card. I am good at containing small bits of information.
					        I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
					        </span>
					      </div>
					    
					  </div>-->
					  <div class="row">
                        <div class="file-field input-field">
					      <div class="btn">
					        <span>File&nbsp;<i class="material-icons">attachment</i> </span>
					        <div id="attachFilesHolder"><input type="file" id="FileUploadControl" multiple/> </div>
					      </div>
					      <div class="file-path-wrapper">
					        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
					      </div>
					    </div>                   
					  </div> 
					  
					  <div id="ModelsSection">
                    </div>
                    <div  class="right-align">
                    <a class="waves-effect waves-light btn-small" id="ModelAdd"><i class="material-icons right">
					add</i>Add Module&nbsp;<span id="ModelNumberIncrement"></span></a>
                    </div>
                    <br/>
                   

                    
                      <!-- Modal Trigger -->
					  <a disableBackdropClick="true"   class="waves-effect waves-light btn modal-trigger" href="#modal1" style="display:none">
					Modal</a>
					
					  <!-- Modal Structure -->
					  <div disableBackdropClick="true" id="modal1" class="modal aa">
					    <div class="modal-content">
					      <div id="SubmitModalHeader"></div>
					      <p id="SubmitModalDescription"></p>
					    </div>
					    <div class="modal-footer">
					    <a id="addNewInstrument" href="" class="modal-close waves-effect waves-green btn-flat">
						Add New Equipment</a>
					      <a  id="goToDashboard"  href="" class="modal-close waves-effect waves-green btn-flat">
						Go to Dashboard</a>
					      
					    </div>
					  </div>
					  
					  <!-- Model deletion error-->
					  <!-- Modal Structure -->
					  <div id="modalDelete" class="modal bb">
					    <div class="modal-content">
					      <h4><i class="material-icons medium">error</i>&nbsp; 
							Equipment must contain at least one Model </h4>
					      <p id="">Cannot remove all Models!</p>
					    </div>
					    <div class="modal-footer">
					    <a href="#" class="modal-close waves-effect waves-green btn-flat">
						Got it!</a>					      
					    </div>
					  </div>
					  
					  <div id="modelMaintainenceScheduleSidebar"></div>
					  
					   <!-- Maintenence Schedule-->
					  <!-- Modal Structure -->
					  <div id="modalMaintenenceSchedule" class="sidenav SidenavEqip  center-align" style="width: 50% !important ; height: 100% !important ;">
					    <div class="">
					    	<div  style="display:block;float:left;background: #039be5;">
				                <h4 class="center-align" style="color:white"><i class="material-icons medium" style="    font-size: 3rem;">
				                update</i></h4>
				            </div>

		    	            <div  style="display:block;padding-top: 1px;padding-bottom: 15px;background: #039be5;">
				                <h4 class="center-align" style="color:white"> Maintenence Schedule</h4>
				            </div>

					      	<div id="carousalid" class="carousel"  style="">
    							  								  
								  <!--<div class="carousel-item card medium" style="width: 259px; height: 247px;">
								    <i class="material-icons center" style="    font-size: 11rem;">date_range</i>
								    <span style="    font-size: 40px;">2020-09-16</span>
								    <div class="card-content">
								      <span class="card-title activator grey-text text-darken-4">Scheduled Maintenence: 2<i class="material-icons right">edit</i></span>
								      <p><a href="#"></a></p>
								    </div>
								    <div class="card-reveal">
								      <span class="card-title grey-text text-darken-4">Scheduled Maintenence: 2<i class="material-icons right">close</i></span>
								      <p>Date: <input type="text" id="scheduledMaintenence2" class="datepicker"/></p>
								    </div>
								  </div>-->
  							</div>					      
					    </div>
					  </div>

					  
					  <!-- Duplicate Model error-->
					  <!-- Modal Structure -->
					  <div id="modalduplicateInstrumentLink" class="modal duplicateInstrument">
					    <div class="modal-content" style="    color: darkslateblue;">
					      <h5><i class="material-icons small">error</i>&nbsp; 
							Equipment with same name exists already! </h5>
					      <p id="">You can use &quot;Change Equipment Name&quot; link to 
							close message and continue editing entry</p>
					      <p id="">You can use &quot;Goto Review existing Equipment&quot; 
							link to Review existing Equipment details</p>
					    </div>
					    <div class="modal-footer">
					    <a href="#" id="" class="modal-close waves-effect waves-green btn-flat">
						Close and Change Equipment Name</a>	&nbsp;&nbsp;&nbsp;&nbsp;
					    <a href="" id="duplicateInstrumentLink" class="modal-close waves-effect waves-green btn-flat">
						Goto Review existing Equipment</a>					      
					    </div>
					  </div>
					  
					  <!-- Critical Instrument and Equipment both YES error-->
					  <!-- Modal Structure -->
					  <div id="modalcriticalEquipInstrWarning" class="modal modalcriticalEquipInstrWarning">
					    <div class="modal-content" style="    color: darkslateblue;">
					      <h5><i class="material-icons small">error</i>&nbsp; 
							Critical Equipment and Critical Insturment both are set to YES! </h5>
					      <p id="">You can review selections or continue.</p>
					    </div>
					    <div class="modal-footer">
					    <a href="#" id="criticalEquipInstrClosebtn" class="modal-close waves-effect waves-green btn-flat">
						Close and Review</a>	&nbsp;&nbsp;&nbsp;&nbsp;
					    <a href="" id="criticalEquipInstrWarningbtn" class="modal-close waves-effect waves-green btn-flat">
						Save and Continue</a>					      
					    </div>
					  </div>

					  
					  <div id="addMethodModal" class="modal addMethodModal">
					    <div class="modal-content" style="    color: darkslateblue;">
					      <div class="row">
                        		<div class="input-field col s12 m11">
		                            <i class="material-icons prefix">dehaze</i>
		                            <input placeholder=""  type="text" id="manualMethod" class="" /> 
		                            <label>Method</label>                           
		                        </div>
							</div>
					    </div>
					    <div class="modal-footer">
					    <a href="#" id="addMethodManuallyButton" class="modal-close waves-effect waves-green btn-flat">Add and Close</a>	&nbsp;&nbsp;&nbsp;&nbsp;
					    <a href="#" class="modal-close waves-effect waves-green btn-flat">Close</a>					      
					    </div>
					  </div>
					  
					  <div id="addPCNameModal" class="modal addPCNameModal">
					    <div class="modal-content" style="    color: darkslateblue;">
					      <div class="row">
                        		<div class="input-field col s12 m6">
		                            <i class="material-icons prefix">desktop_windows</i>
		                            <input placeholder=""  type="text" id="manualPCName" class="" /> 
		                            <label>PC Name<Span class="red-text text-accent-4">*</Span></label>  
		                            <p class="red-text" id="manualPCNameError">Enter PC Name</p>                         
		                        </div>
		                        <div class="input-field col s12 m6">
		                            <i class="material-icons prefix">edit_location</i>
		                            <input placeholder=""  type="text" id="manualLocation" class="" /> 
		                            <label>Location<Span class="red-text text-accent-4">*</Span></label>
		                            <p class="red-text" id="manualLocationError">Enter Location</p>                            
		                        </div>
							</div>
					    </div>
					    <div class="modal-footer">
					    <a href="#" id="addPCNameManuallyButton" class="modal-close waves-effect waves-green btn-flat">Add and Close</a>	&nbsp;&nbsp;&nbsp;&nbsp;
					    <a href="#" class="modal-close waves-effect waves-green btn-flat">Close</a>					      
					    </div>
					  </div>
					  

					  
					  

                     <!--<div class="row" style="display">
                        <div class="right-align">
                            <button type="submit" id="Submit" name="submit" value="Submit"
                                class="btn waves-effect waves-light btn-large z-depth-2">
							Submit <i
                                    class="material-icons right">send</i></button>
                        </div>
                    </div>-->
                    
                    
                    <div class="row">
                        <div class="center-align">

                    <!--<a class="btn waves-effect waves-light btn-large z-depth-2"  type="submit" id="Submit1">Submit<i class="material-icons right">send</i></a>-->
                     		<button type="submit" Id="Submit" name="submit" value="Submit button"
                                class="btn waves-effect waves-light btn-large z-depth-2">
							Submit <i
                                    class="material-icons right">send</i></button>

                    &nbsp;&nbsp;&nbsp;
                    <a class="btn waves-effect waves-light btn-large z-depth-2" id="Cancel">
					Cancel<i class="material-icons right">cancel</i></a>
                    

                           <!-- <input type="button" id="Submit1" class="btn waves-effect waves-light btn-large z-depth-2" value="Submit"/>
							&nbsp;&nbsp;&nbsp;
							<input type="button" style="background-color:#e57373" id="Cancel" class="btn waves-effect waves-light btn-large z-depth-2 red" value="Cancel"/>-->
                        </div>
                    </div>

				</div>
            </form>
         </div>
    </main>
<script src="../SiteAssets/IMS/JS/materialize.min.js"></script>
</asp:Content>

<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">

    <link rel="stylesheet" href="../SiteAssets/IMS/JS/materialize.min.css" />
    <link href="../SiteAssets/IMS/JS/Material+Icons.css" rel="stylesheet" />
    <link rel="stylesheet" href="../SiteAssets/IMS/JS/Style.css" />
    

    <script type="text/javascript" src="../SiteAssets/IMS/JS/jquery-3.2.1.min.js"></script>
    
    <script type="text/javascript" src="../SiteAssets/IMS/JS/IMSService.js"></script>
    <script type="text/javascript" src="../SiteAssets/IMS/JS/NewItem.js"></script>
    
</asp:Content>