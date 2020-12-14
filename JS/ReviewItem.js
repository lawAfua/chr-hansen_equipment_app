$(document).ready(function () {

	/*REVIEW ITEM CODE- START*/
	var id=getUrlParameter('ItemId');
	var concurancyCheckCurrentItem;
	var displayModeQS=getUrlParameter('pagetype');
	var displayMode="";
	var largestModeld;
	var modelDeleted = [];
	var FileTitleArray=[];
	var modelPresent = [];
	var existingModulesToBeDeleted=[];
	var BeforeChangeEquipmentDate;
	if(displayModeQS=="View")
	{
		displayMode=="View";
		$('#Cancel1').show();
		$('#pageHeader').html("View Instrument");
		$('#equipmentName,#model,#addPCNameManually,#InstallationYear,#ModificationYear,#contactPersonNameI,#MaintenenceSchedule,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector,#locationRoom,#equipmentType,#isHavingServiceAgreement,#commentsI,#contractServiceAgreementNumberI,#Price,#manufacture,#manufactureYear,#criticalIstrument,#pcBackup,#pC,#method,#responsibleEmployee,#backupResponsible,#isActive,#IsCriticalEquipemnt,#isHavingServiceAgreementI,#riskAssessmentDate').attr("disabled","disabled") 
		$('.FileUploadControl,#addPCNameManually,#addMethodManually,#fileuploadControl,#ModelAdd,#Submit,#Cancel').hide();		
	}
	if(displayModeQS=="Edit")
	{
		displayMode=="Edit";
		$('#Cancel1').hide();
		$('#pageHeader').html("Edit Instrument");
		$('#gotoDashboard').hide();
		 $(window).bind('beforeunload', function(){
		  return 'Are you sure you want to leave/reload?';
		});
	}
	var equipmentUpcomingMaintenanceDate ;
	$("#gotoDashboard,#Cancel1").attr("href", _spPageContextInfo.webAbsoluteUrl +"/SitePages/Dashboard.aspx");
	function PopulateItemDetails(id)
    {
    	instrumentUrl = "$select=AttachmentFiles,Author/Id,Author/Title,Editor/Id,Editor/Title,ResponsibleEmployee/Id,ResponsibleEmployee/Title,BackupResponsible/Id,BackupResponsible/Title,PC/Id,PC/PCName,*&$filter=Id eq "+id+"&$expand=PC,Author,Editor,ResponsibleEmployee,BackupResponsible,AttachmentFiles";
    	 $.when(getItemsbyFilters(InstrumentsListName , instrumentUrl ), getItemsbyFilters(ModelsListName ,'select=AttachmentFiles,*&$filter=EquipmentId eq '+id+"&$expand=AttachmentFiles")).then(
    		function (InstrumentsData, ModelsData) {
    			console.log(InstrumentsData);
    			console.log(ModelsData);
    			concurancyCheckCurrentItem= InstrumentsData[0];
    			//$('#equipmentName').attr('placeholder',"");
    			BeforeChangeEquipmentDate = InstrumentsData[0].EquipmentName;
    			$('#equipmentName').val(InstrumentsData[0].EquipmentName);
			    $('#model').val(InstrumentsData[0].Model);
			    $('#locationRoom').val(InstrumentsData[0].LocationRoomNo);
			    $('#manufacture').val(InstrumentsData[0].Manufacturer);
			    $('#InstallationYear').val(InstrumentsData[0].InstallationYear);
			    $('#manufactureYear').val(InstrumentsData[0].ManufacturingYearInstallation);
			    $('#criticalIstrument').val(InstrumentsData[0].CriticalInstrument);
			    $('#IsCriticalEquipemnt').val(InstrumentsData[0].IsCriticalEquipemnt );
			    $('#pcBackup').val(InstrumentsData[0].PCBackupInternet);
			    $('#equipmentType').val(InstrumentsData[0].EquipmentType);
			    if(InstrumentsData[0].RiskAssessmentDate != null){$('#riskAssessmentDate').val((InstrumentsData[0].RiskAssessmentDate).split('T')[0])}; 	    
		    	$('#equipmentType').change();  
		    	$('#MaintenanceFreqMonthSelector').val(InstrumentsData[0].MaintenanceFreqMonthSelector);
			    $('#Price').val(InstrumentsData[0].Price);
			    $('#equipmentIdCustom').val(InstrumentsData[0].IdEquipment);
			    if(InstrumentsData[0].UpcomingMaintenenceDate)
			    {
			    	equipmentUpcomingMaintenanceDate = InstrumentsData[0].UpcomingMaintenenceDate;
			    }
			    $('#pcBackup').change();
		    	
			    
			    if(InstrumentsData[0].MethodsUniqueToInstrument!= null)
			    {
			    	for (var x = 0; x < InstrumentsData[0].MethodsUniqueToInstrument.results.length; x++) {
			    		var iSChoicePresent= false;
					    $('#MethodsUniqueToInstrument option').each(function() {
						    if($(this).val() == InstrumentsData[0].MethodsUniqueToInstrument.results[x])
						    {
						    	iSChoicePresent = true;
						    }
						});
						if(!iSChoicePresent)
						{
							$("#MethodsUniqueToInstrument").append('<option value="' + InstrumentsData[0].MethodsUniqueToInstrument.results[x] + '">' + InstrumentsData[0].MethodsUniqueToInstrument.results[x] + '</option>');
						}
					}
			    	$('#MethodsUniqueToInstrument').val(InstrumentsData[0].MethodsUniqueToInstrument.results);
			    }
			    
			    if(InstrumentsData[0].Method != null)
			    {
			    	for (var x = 0; x < InstrumentsData[0].Method.results.length; x++) {
			    		var iSChoicePresent= false;
					    $('#method option').each(function() {
						    if($(this).val() == InstrumentsData[0].Method.results[x])
						    {
						    	iSChoicePresent = true;
						    }
						});
						if(!iSChoicePresent)
						{
							$("#method").append('<option value="' + InstrumentsData[0].Method.results[x] + '">' + InstrumentsData[0].Method.results[x] + '</option>');
						}
					}
			    	$('#method').val(InstrumentsData[0].Method.results);
			    }//(InstrumentsData[0].Method.results).join());//
			    $('select').formSelect();
			    $('#responsibleEmployee').val(InstrumentsData[0].ResponsibleEmployee.Title);
			    $('#backupResponsible').val(InstrumentsData[0].BackupResponsible.Title);
			    $('#isActive').prop('checked', InstrumentsData[0].IsActive);
			    $('#pC').val(InstrumentsData[0].PC.Id);
			    $('#ModificationYear').val(InstrumentsData[0].ModificationYear),
			    $('select').formSelect();
			    $('#pC').formSelect();
				if(InstrumentsData[0].Renewal_x0020_Date != null){$('#renewalDateI').val((InstrumentsData[0].Renewal_x0020_Date).split('T')[0])};

//$('.renewalDateClass ').datepicker('setDate', new Date());
		    	 $('#isHavingServiceAgreementI').val(InstrumentsData[0].IsHavingServiceAgreement);
		    	 $('#contactPersonNameI').val(InstrumentsData[0].ContactPerson);
		    	 $('#contactPersonEmailI').val(InstrumentsData[0].ContactPersonEmail);
		    	 $('#contactPersonPhoneI').val(InstrumentsData[0].ContactPersonMobile);
		    	 $('#frequencyI').val(InstrumentsData[0].Frequency);
		    	 $('#commentsI').val(InstrumentsData[0].Comments);
		    	 $('#contractServiceAgreementNumberI').val(InstrumentsData[0].ContractServiceAgreementNumber);
		    	 $('#isHavingServiceAgreementI').change();
		    	if(InstrumentsData[0].AttachmentFiles.results.length>0)
			    {
			    	for(var t=0;t<InstrumentsData[0].AttachmentFiles.results.length;t++)
			    	{
			    		var attUrl=_spPageContextInfo.webAbsoluteUrl +'/Lists'+(InstrumentsData[0].AttachmentFiles.results[t].ServerRelativeUrl).split("Lists")[1];//_spPageContextInfo.webAbsoluteUrl +InstrumentsData[0].AttachmentFiles.results[t].ServerRelativeUrl;
			    		//$('#previousattachmentsAll').append('<div class="attachmetsshow">&nbsp<i class="tiny material-icons">attachment</i>&nbsp<a href="'+attUrl+'">'+InstrumentsData[0].AttachmentFiles.results[t].FileName+'</a>&nbsp;&nbsp<i class="tiny material-icons">clear</i></div>');
			    		$('#previousattachmentsAll').append('<div class="chip deleteAttachChipClass'+t+'">&nbsp    <a target="_blank"  href="'+attUrl+'"><i class="tiny material-icons">attachment</i>&nbsp'+InstrumentsData[0].AttachmentFiles.results[t].FileName+'</a> <span class="closeIconAttachment"><i class="deleteAttachmentIcon material-icons " id="Attach_'+t+'" name="'+InstrumentsData[0].AttachmentFiles.results[t].FileName+'">close</i> </span> </div>');
			    		
			    		//console.log(_spPageContextInfo.webAbsoluteUrl +'/Lists'+(InstrumentsData[0].AttachmentFiles.results[t].ServerRelativeUrl).split("Lists")[1]);	
			    		//FileTitleArray.push(InstrumentsData[0].AttachmentFiles.results[t].FileName);
			    	}
			    }
			    else
			    {$('#previousattachmentsAll').append('<div>No Attachments</div>')}	
			    		    
			    for(var y=0;y<ModelsData.length;y++)
			    {
			    	
			    	var nextModelIdRepeat = ModelsData[y].Title.split("_")[1];
			    	//$('body').on('focus', '.modelName', function() {
					// 	$(this ).click();;//alert();
				    //})
			    	modelPresent.push(nextModelIdRepeat);
			    	largestModeld = nextModelIdRepeat ;
			    	 AddModel(LoadedModelsData, nextModelIdRepeat);
			    	 $('#modelName_'+nextModelIdRepeat ).attr('value',ModelsData[y].Name);
			    	 $('#ModuleListItemId_'+nextModelIdRepeat ).attr('value',ModelsData[y].Id);			    	 
			    	 $('#modelManufacture_'+nextModelIdRepeat ).val(ModelsData[y].Manufacturer);
			    	 $('#serialNumber_'+nextModelIdRepeat ).val(ModelsData[y].SerialNumber);
			    	 $('#contractCompany_'+nextModelIdRepeat ).val(ModelsData[y].ContractCompany);
			    	 if(ModelsData[y].Renewal_x0020_Date != null){$('#renewalDate_'+nextModelIdRepeat ).val((ModelsData[y].Renewal_x0020_Date).split('T')[0])};
			    	 $('#isHavingServiceAgreement_'+nextModelIdRepeat ).val(ModelsData[y].IsHavingServiceAgreement);
			    	 $('#contactPersonName_'+nextModelIdRepeat ).val(ModelsData[y].ContactPerson);
			    	 $('#contactPersonEmail_'+nextModelIdRepeat ).val(ModelsData[y].ContactPersonEmail);
			    	 $('#contactPersonPhone_'+nextModelIdRepeat ).val(ModelsData[y].ContactPersonMobile);
			    	 $('#frequency_'+nextModelIdRepeat ).val(ModelsData[y].Frequency);
			    	 $('#MaintenanceFreqMonthSelector_'+nextModelIdRepeat ).val(ModelsData[y].MaintenanceFreqMonthSelector);
			    	 $('#comments_'+nextModelIdRepeat ).val(ModelsData[y].Comments);
			    	 $('#contractServiceAgreementNumber_'+nextModelIdRepeat ).val(ModelsData[y].ContractServiceAgreementNumber);
			    	 $('#isHavingServiceAgreement_'+nextModelIdRepeat ).change();			    	 

			if(ModelsData[y].AttachmentFiles.results.length>0)
			    {
			    	for(var t=0;t<ModelsData[y].AttachmentFiles.results.length;t++)
			    	{
			    		var attUrl=_spPageContextInfo.webAbsoluteUrl +'/Lists'+(ModelsData[y].AttachmentFiles.results[t].ServerRelativeUrl).split("Lists")[1];//_spPageContextInfo.webAbsoluteUrl +InstrumentsData[0].AttachmentFiles.results[t].ServerRelativeUrl;
			    		$('#previousattachmentsModulesAll_'+nextModelIdRepeat).append('<div class="chip deleteAttachChipClass'+t+'_'+nextModelIdRepeat+'">&nbsp    <a target="_blank"  href="'+attUrl+'"><i class="tiny material-icons">attachment</i>&nbsp'+ModelsData[y].AttachmentFiles.results[t].FileName+'</a> <span class="closeIconAttachment"><i class="ModulesdeleteAttachmentIcon material-icons " id="Attach_'+t+'_'+nextModelIdRepeat+'" name="'+ModelsData[y].AttachmentFiles.results[t].FileName+'">close</i> </span> </div>');
			    	}
			    }
			    else
			    {$('#previousattachmentsModulesAll_'+nextModelIdRepeat).append('<div>No Attachments</div>')}	


			    	 
			    }
			    if(displayModeQS=="View")
				{
					$('.contractServiceAgreementNumber,.comments,.modelName,.maintenenceschedule,.modelManufacture,.serialNumber,.contractCompany,.modelName,.renewalDate').attr("disabled","disabled");
			    	 $('.isHavingServiceAgreement,.contactPersonName,.contactPersonEmail,.contactPersonPhone,.frequency,.MaintenanceFreqMonthSelector').attr("disabled","disabled");
			    	 $('#MaintenenceSchedule,.maintenenceschedule,.deleteModel,.FileUploadControl,#ModelAdd,#Cancel,#Submit').hide();
			    	 $('.closeIconAttachment').hide(); 
			    }
			    
			    $('input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea').each(function (element, i) {
				    if ((element.value !== undefined && element.value.length > 0) || $(this).attr('placeholder') !== null) {
				        $(this).siblings('label').addClass('active');
				    }
				    else {
				        $(this).siblings('label').removeClass('active');
				    }
				});
				$('.datepicker').datepicker({
    	format : 'yyyy-mm-dd',
    	autoClose: true
    });


			    
			    
			    

			    var arrayWithAllIds= [];
			    console.log(modelPresent);console.log(largestModeld );
			    for(var i=1;i<=largestModeld ;i++)
			    {
			    	arrayWithAllIds.push((i).toString());
				}				
				modelDeleted = [];
				var i = 0;
				jQuery.grep(arrayWithAllIds , function(el) {				
				    if (jQuery.inArray(el,modelPresent ) == -1)  modelDeleted.push(el);		
				    i++;				
				});				
			    $('select').formSelect();
    		}
    	);
    	
    }  
    	$('body').on('click', '.deleteAttachmentIcon', function() {
		var deletedId= (this.id).split('_')[1]
		$('.deleteAttachChipClass'+deletedId).hide();
	    FileTitleArray.push(this.attributes[2].nodeValue);
		});
		
		$('body').on('click', '.ModulesdeleteAttachmentIcon', function() {
		var Modelid= (this.id).split('_')[2];
		var deletedId= (this.id).split('_')[1];
		$('.deleteAttachChipClass'+deletedId+'_'+Modelid).hide();
		var filename="";
		filename = $('#AttachDel_'+ Modelid).val();
		filename = filename + (this.attributes[2].nodeValue)
	    $('#AttachDel_'+ Modelid).val(filename+"##1##");
		});	
		
		
	
      
    /*
    //#1
    $('.autocomplete').autocomplete('updateData', data);
			PopulateItemDetails(id,LoadedModelsData);-----------------------
            stateChange(-1);
     
     //#2
     LoadedModelsData=ModelsData;
			//AddModel(LoadedModelsData, nextModelId);----------------------------
            var data = {};

	*/    
    /*REVIEW ITEM CODE- END*/
	
	//Set form controls
    $('input.autocomplete').autocomplete({
        data: {
        },
    });
    $('.tooltipped').tooltip();    
    $('.SidenavEqip').sidenav();  
    
    $('body').on('change', ".upcomingLatestScheduledMaintananceDateClass", function() {
	    if($('#upcomingLatestScheduledMaintananceDate').val())
	    {$('#upcomingLatestScheduledMaintananceDate1').val($('#upcomingLatestScheduledMaintananceDate').val())};
    });  
    
    $('#MaintenenceSchedule').click(function(){
    
    $("#carousalid").empty();
    $('.SidenavEqip').sidenav();
    $('.SidenavEqip').sidenav('open');
    var upcomingLatestDateIndexNumber=0;  
    var latestupcomingDateCaptured = false;
    var newDate = addDays(new Date($('#renewalDateI').val()+"T07:00:00Z"), 0);
    var dateForUpcomingLatest = addDays(new Date($('#renewalDateI').val()+"T07:00:00Z"), 0);
    for(var i=1;i<=$('#frequencyI').val();i++)
    {     	   	
		dateForUpcomingLatest = addDays(dateForUpcomingLatest , 30*($('#MaintenanceFreqMonthSelector').val()/$('#frequencyI').val()));//newDate.addDays(4);
		if(dateForUpcomingLatest >new Date() && !latestupcomingDateCaptured )
		{upcomingLatestDateIndexNumber = i;latestupcomingDateCaptured =true;}
	}
	
    for(var i=1;i<=$('#frequencyI').val();i++)
    {   
    	if(upcomingLatestDateIndexNumber ==i )
    	{ 	
			newDate = addDays(newDate , 30*($('#MaintenanceFreqMonthSelector').val()/$('#frequencyI').val()));//newDate.addDays(4);
	   		$("#carousalid").append(		'  <div class="carousel-item card medium" style="">	<div style="    margin-top: 10px;"><span style="font-size:16px;">Upcoming Scheduled Maintenence: '+i+'</span></div>'+		
			'	<div class="card-content">	'+
			'	  <span class="card-title activator grey-text text-darken-4"><i class="material-icons center" style="    ;">date_range</i>	'+
			'	<span style="    font-size: ;"><input type="text" id="upcomingLatestScheduledMaintananceDate1" class="upcomingLatestScheduledMaintananceDateClass1"><span id="saveupcomingLatestScheduledMaintananceDate"><i class="material-icons center"></i></span></span>	'+
			'	  <p><a href="#"></a></p>	'+
			'	</div>	'+
			' </div>	');
			if(equipmentUpcomingMaintenanceDate)
		    {
		    	$('#upcomingLatestScheduledMaintananceDate1').val((equipmentUpcomingMaintenanceDate).split('T')[0]);
		    
				$('.upcomingLatestScheduledMaintananceDateClass').datepicker({minDate: addDays(newDate,-4),maxDate: addDays(newDate,4),
		    	format : 'yyyy-mm-dd',
		    	autoClose: true,
		    	defaultDate: new Date(equipmentUpcomingMaintenanceDate)
			    });
		    }
		    else
		    {
		    	$('.upcomingLatestScheduledMaintananceDateClass').datepicker({minDate: addDays(newDate,-4),maxDate: addDays(newDate,4),
		    	format : 'yyyy-mm-dd',
		    	autoClose: true,
		    	defaultDate: new Date(newDate)
			    });
			    $('#upcomingLatestScheduledMaintananceDate1').val((newDate.toISOString()).split('T')[0]);
		    }
		    
		    $('#upcomingLatestScheduledMaintananceDate1').click(function(){
		    $('.upcomingLatestScheduledMaintananceDateClass').datepicker('open');
		    });
		    
		    
			

		}
		else
		{
			newDate = addDays(newDate , 30*($('#MaintenanceFreqMonthSelector').val()/$('#frequencyI').val()));//newDate.addDays(4);
	   		$("#carousalid").append(		'  <div class="carousel-item card medium" style="">	<div style="    margin-top: 10px;"><span style="font-size:16px;">Scheduled Maintenence: '+i+'</span></div>'+		
			'	<div class="card-content">	'+
			'	  <span class="card-title activator grey-text text-darken-4"><i class="material-icons center" style="    ;">date_range</i>	'+
			'	<span style="    font-size: ;">'+newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate()+'<i class="material-icons center">more_vert</i></span>	'+
			'	  <p><a href="#"></a></p>	'+
			'	</div>	'+
			'	<div class="card-reveal">	'+
			'	  <span class="card-title grey-text text-darken-4">	<i class="material-icons center" style="    ;">date_range</i>	'+
			'	<span style="    font-size: ;">'+newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate()+'</span><i class="material-icons center">close</i></span>	'+
			'	  <p>Only latest/first upcoming Schedule can be edited in Edit form!</p>	'+
			'	</div>	'+
			' </div>	');
		}
	}
	
	//$('#saveupcomingLatestScheduledMaintananceDate').click($('.SidenavEqip').sidenav('close'));
	$('#carousalid').carousel();
	//$("#carousalid").trigger("click");
	if($('#frequencyI').val()==0)
	{$('.carousel').carousel('next',1);}
	$('.carousel').carousel();      
    });
	function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
	}    
    //$('.sidenav').sidenav('open');    $("#carousalid").trigger("click");
  
    $('.modal.aa').modal();
    //$('.modal.aa').modal('dismissible',false);
    $('.collapsible').collapsible();
    $('.datepicker').datepicker({
    	format : 'yyyy-mm-dd',
    	autoClose: true
    });
    $("#Submit1,#Cancel").css("font-weight", 600);
    $("#Submit1,#Cancel").css("color", "White");
    $("#ModelAdd").css("background-color", "#0277bd"	);
    $("#Cancel").css("background-color", "#e57373"	);
    $("#Cancel").click(function(){
    if (confirm("Confirm Cancel and Goto Dashboard?")) {
	  $(location).attr('href', _spPageContextInfo.webAbsoluteUrl + '/SitePages/Dashboard.aspx');
	}	
    });
    
    $(".mat-input").focus(function(){
	});
	
	$('body').on('focus', ".datefocus", function() {
	 var dateId = ($(this)[0].id).split('_')[1];
    	$('#renewalDate_'+dateId ).datepicker('open');
    })
    
    $("select[required]").css({display: "block", height: 0, padding: 0, width: 0, position: 'absolute'});


    $("#FormContent").hide();
    $("#preLoader").addClass("active");
    $('select').formSelect();
    var nextModelId=1;
	var LoadedModelsData;
	var latestResponsibleEmployeeAutocompleteCollection = {};
    var latestBackupResponsibleAutocompleteCollection = {};
	//Load fields dropdowns, Lookups
    $.when(getFieldsData(InstrumentsListName), getFieldsData(ModelsListName ), getItems(PCsListName ),getItemsByUrl("/_api/web/siteusers?$select=Id,Title,Email")).then(
        function (InstrumentsData, ModelsData, PCsData,usersData) {
            //console.log(ModelsData);
            InstrumentsData.forEach(myFunction);
            function myFunction(InstrumentsData) {
                FormChoices(InstrumentsData, "CriticalInstrument", 'criticalIstrument');
                FormChoices(InstrumentsData, "EquipmentType", 'equipmentType');
                FormChoices(InstrumentsData, "IsCriticalEquipemnt", 'IsCriticalEquipemnt');
                FormChoices(InstrumentsData, "PCBackupInternet", 'pcBackup');
                FormChoices(InstrumentsData, "IsHavingServiceAgreement", 'isHavingServiceAgreementI');
                FormChoices(InstrumentsData, "Method", 'method');
                //FormChoices(InstrumentsData, "Method", 'methodDatalist');
            }
            $("#isHavingServiceAgreementI").val('No');
            $("#pcBackup").change();
		    $('select').formSelect();
		    $('.contractGroupI').hide();
            
            var pCoptions = "";
            $.each(PCsData, function (key, value) {
                pCoptions += '<option value="' + PCsData[key].Id + '">' + PCsData[key].PCName + '</option>';
            });
            $('#pC').append(pCoptions);
            $('#pC').formSelect();
            LoadedModelsData=ModelsData;
			//AddModel(LoadedModelsData, nextModelId);
            var data = {};
            $.each(usersData, function (key, value) {
                data[usersData[key].Title] = null;
                latestResponsibleEmployeeAutocompleteCollection[usersData[key].Title] = usersData[key].Id;
                latestBackupResponsibleAutocompleteCollection[usersData[key].Title] = usersData[key].Id;
            });
            $('.autocomplete').autocomplete('updateData', data);
			//Loader stop
			PopulateItemDetails(id,LoadedModelsData);
            stateChange(-1);
            function stateChange(newState) {
                setTimeout(function () {
                    if (newState == -1) {
                        $("#FormContent").show();
                        HidePreLoader();
                    }
                }, 1000);
            }
        });
        
    $('#pcBackup').change(function() {
    	if($('#pcBackup').val()=='NR')
    	{
	    	$('.PCClass').hide();
	    	$('#pC').prop('required', false);
    	}
    	else if($('#pcBackup').val()=='YES'  || $('#pcBackup').val()=='NO')
    	{
    		$('.PCClass').show();
	    	$('#pC').prop('required', true);
    	}
    })
    $('.AnalyticalApplianceClass').hide();	
    $('#equipmentType').change(function() {
    	if($('#equipmentType').val()=='Analytical Instrument')
    	{
	    	$('.AnalyticalApplianceClass').show();
    	}
    	else
    	{
    		$('.AnalyticalApplianceClass').hide();
    	}
    })
    
    $('#contractServiceAgreementNumberI').change(function() {   
    	//$('#Price,#contactPersonNameI,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector').prop('placeholder', 'a'); 
		//$('#Price,#contactPersonNameI,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector').val('');
		//$('#Price,#contactPersonNameI,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector').prop('disabled', true);
		$.when(getItemsByUrlAsync("/_api/web/lists/GetByTitle('"+InstrumentsListName +"')/items?$select=*&$filter=ContractServiceAgreementNumber eq '"+ $('#contractServiceAgreementNumberI').val() +"'")).then(function (existingContractServiceAgreementNumber) {
			if(existingContractServiceAgreementNumber.length>0 && ($.trim($('#contractServiceAgreementNumberI').val()).length > 0)){
			$('#Price,#contactPersonNameI,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector').val('');
			
			$('#Price,#contactPersonNameI,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector').each(function (element, i) {
				    if ((element.value !== undefined && element.value.length > 0) || $(this).attr('placeholder') !== null) {
				        $(this).siblings('label').addClass('active');
				    }
				    else {
				        $(this).siblings('label').removeClass('active');
				    }
				});

			$('#Price').val(existingContractServiceAgreementNumber[0].Price);
			$('#contactPersonNameI').val(existingContractServiceAgreementNumber[0].ContactPerson);
			$('#contactPersonEmailI').val(existingContractServiceAgreementNumber[0].ContactPersonEmail);
			$('#contactPersonPhoneI').val(existingContractServiceAgreementNumber[0].ContactPersonMobile);
			$('#renewalDateI').val((existingContractServiceAgreementNumber[0].Renewal_x0020_Date).split('T')[0]);
			$('#frequencyI').val(existingContractServiceAgreementNumber[0].Frequency);
			$('#MaintenanceFreqMonthSelector').val(existingContractServiceAgreementNumber[0].MaintenanceFreqMonthSelector);
			$('#Price,#contactPersonNameI,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector').prop('disabled', true);			
			}
			else
			{
				$('#Price,#contactPersonNameI,#contactPersonEmailI,#contactPersonPhoneI,#renewalDateI,#frequencyI,#MaintenanceFreqMonthSelector').prop('disabled', false);
			}
		})
	})

    
    
    
    $('#addMethodManually').click(function() {
    	$('.modal.addMethodModal').modal();
		$('.modal.addMethodModal').modal('open');
	})
	
	$('#addMethodManuallyButton').click(function() {
		if($.trim($("#manualMethod").val()).length != 0)
		{
			GetFieldOptions(InstrumentsListName , "Method").done(function (data) {
				var existingoptions = data.d.results[0].Choices.results;
				if(!existingoptions.includes($("#manualMethod").val()))
				{
					$.when(updateChoiceField(InstrumentsListName , "Method", $("#manualMethod").val() )).then(function(successFlag){						        
				        if(successFlag)
				        {
					        $("#method").append('<option value="' + $("#manualMethod").val() + '">' + $("#manualMethod").val() + '</option>');
					        $('select').formSelect();	
					        $("#manualMethod").val("");	
					    }		    
			    	})
			    }
	    	})
	    }
	})
	
	//$('.modal.addPCNameModal').modal();
	$('.modal.addPCNameModal').modal({
      //dismissible: false
		});
	$('.modal.modalcriticalEquipInstrWarning').modal({dismissible: false});
	$('#addPCNameManually').click(function() {    	
		$('.modal.addPCNameModal').modal('open');
	})
	$('#manualLocationError').hide();
	$('#manualPCNameError').hide();
	
	
	$('#addPCNameManuallyButton').click(function() {	
		$('#manualLocationError').hide();
		$('#manualPCNameError').hide();
        if($.trim($("#manualPCName").val()).length != 0 && $.trim($("#manualLocation").val()).length != 0)
		{
			var PCManualData= {
            __metadata: {
	                'type': 'SP.Data.'+PCsListName +'ListItem'
	            },
	            Title: 'JSF_'+ new Date().toISOString(),
	            PCName: $('#manualPCName').val(),
	            Location : $('#manualLocation').val()
          	}
          	$.when(addNewItem(PCsListName , PCManualData)).then(function (response) {
                if (response.d.Id) {
                	$.when(getItems(PCsListName )).then(
			    		function (PCsDataManual) {
			    			$('#pC').empty();
			    			var pCoptionsManual = "";
				            $.each(PCsDataManual, function (key, value) {
				                pCoptionsManual += '<option value="' + PCsDataManual[key].Id + '">' + PCsDataManual[key].PCName + '</option>';
				            });
				            $('#pC').append(pCoptionsManual);
				            $('#pC').formSelect();   			
			    	});
                }
            })	
	        $("#manualPCName").val("");
	        $("#manualLocation").val("");	
	    }
	    else
	    {
	    	if($.trim($("#manualPCName").val()).length == 0)	    	
			$('#manualPCNameError').show();
			if($.trim($("#manualLocation").val()).length == 0)
			$('#manualLocationError').show();
	    }
	})
	
	$("#manualPCName").focusout(function(){
    	if($.trim($("#manualPCName").val()).length == 0)	    	
		$('#manualPCNameError').show();
		else
		$('#manualPCNameError').hide();
	  
	});
	$("#manualLocation").focusout(function(){
	    if($.trim($("#manualLocation").val()).length == 0)
		$('#manualLocationError').show();
		else
		$('#manualLocationError').hide();
	  
	});



	
    $('#method').change(function() {
		$("#MethodsUniqueToInstrument").empty();
		$("#criticalIstrument").val('No');
		$('select').formSelect();
		$.each($('#method').val(), function( index, value ) {
			$.when(getItemsbyFilters(InstrumentsListName ,"select=EquipmentName&$filter=Method eq '"+ value +"' and Id ne "+ id)).then(
    		function (InstrumentsFilteredData) {
    			console.log(InstrumentsFilteredData);
    			if(InstrumentsFilteredData.length==0)
    			{
    				$("#MethodsUniqueToInstrument").append('<option selected value="' + value  + '">' + value  + '</option>');
	        		$("#criticalIstrument").val('Yes');
	        		$('select').formSelect();    				
    			}    			
    		});
		});
    })

	
  
    $('#isActive').change(function() {
    	if(!($('#isActive').prop('checked')))
    	{
    		if (confirm("For Inactive Equipments, 'Method' field will be empty and disabled. Confirm to continue?")) {
		    	$('#method').val("");
		    	$('#MethodsUniqueToInstrument').val("");
		    	$('#criticalIstrument').val("");
		    	$('#method').prop('disabled', true)
			}
			else
			{
				$('#isActive').prop('checked', true);
				$('#method').prop('disabled', false);				
			}
		}
		else
		{
			$('#method').prop('disabled', false);
		}
		$('select').formSelect();
    })
    
    $('#pcBackup').change(function() {
    	if($('#pcBackup').val() != null)
    	{
	    	if(($('#pcBackup').val()).indexOf('Yes') > -1)
	    	{
	    		$('.pcClass').show();
	    		$('#pC').prop('required', true);
			}
			else
			{
				$('.pcClass').hide();
				$('#pC').prop('required', false);
			}
			$('select').formSelect();
		}
			else
			{
				$('.pcClass').hide();
				$('#pC').prop('required', false);
			}
			$('select').formSelect();		
    })
        
     //Change event of isHavingServiceAgreement-- Hide and Validate respective fields     
    $('#isHavingServiceAgreementI').change(function() {
    	if($('#isHavingServiceAgreementI').val()=='No')
    	{
	    	$('.contractGroupI').hide();
	    	$('#contactPersonNameI').prop('required', false);
	    	$('#contractServiceAgreementNumberI').prop('required', false);
    		$('#contactPersonPhoneI').prop('required', false);
    		$('#contactPersonEmailI').prop('required', false);
    		$('#Price').prop('required', false);
    		$('#renewalDateI').prop('required', false);
    		$('#frequencyI').prop('required', false);
    	}
    	else if($('#isHavingServiceAgreementI').val()=='Yes')
    	{
    		$('.contractGroupI').show();
	    	$('#contactPersonNameI').prop('required', true);
	    	$('#contractServiceAgreementNumberI').prop('required', true);
    		$('#contactPersonPhoneI').prop('required', true);
    		$('#contactPersonEmailI').prop('required', true);
    		$('#Price').prop('required', true);
    		$('#renewalDateI').prop('required', true);
    		$('#frequencyI').prop('required', true);
    	}
    })
    


    
	//Change event of isHavingServiceAgreement-- Hide and Validate respective fields     
    $('body').on('change', "[name='isHavingServiceAgreement']", function() {
    	//alert($(this).val());
    	var currentModId=($(this)[0].id).split("_")[1];
    	if($(this).val()=='No')
    	{
	    	$('.contractGroup_'+ currentModId).hide();
	    	$('#contactPersonName_'+ currentModId).prop('required', false);
	    	$('#contractServiceAgreementNumber_'+ currentModId).prop('required', false);
    		$('#contactPersonPhone_'+ currentModId).prop('required', false);
    		$('#contactPersonEmail_'+ currentModId).prop('required', false);
    	}
    	else if($(this).val()=='Yes')
    	{
    		$('.contractGroup_'+ currentModId).show();
    		$('#contactPersonName_'+ currentModId).prop('required', true);
    		$('#contractServiceAgreementNumber_'+ currentModId).prop('required', true);
    		$('#contactPersonPhone_'+ currentModId).prop('required', true);
    		$('#contactPersonEmail_'+ currentModId).prop('required', true);
    	}
    })
    
    //SA details should autopopulated on basis of existing DA number in Moudles list
    $('body').on('change', "[name='contractServiceAgreementNumber']", function() {
    	//alert($(this).val());
    	var currentModId=($(this)[0].id).split("_")[1];
    	$.when(getItemsByUrlAsync("/_api/web/lists/GetByTitle('"+ModelsListName +"')/items?$select=*&$filter=ContractServiceAgreementNumber eq '"+ $('#contractServiceAgreementNumber_'+currentModId).val() +"'")).then(function (existingContractServiceAgreementNumberModules) {
			if(existingContractServiceAgreementNumberModules.length>0 && ($.trim($('#contractServiceAgreementNumber_'+currentModId).val()).length > 0)){
			$('#contactPersonName_'+currentModId,'#contactPersonEmail_'+currentModId,'#contactPersonPhone_'+currentModId,'#renewalDate_'+currentModId,'#frequency_'+currentModId,'#MaintenanceFreqMonthSelector_'+currentModId).val('');
			
			$('input[id="contactPersonName_'+currentModId+'"],input[id="contactPersonPhone_'+currentModId+'"],input[id="contactPersonEmail_'+currentModId+'"],input[id="frequency_'+currentModId+'"],input[id="renewalDate_'+currentModId+'"]').each(function (element, i) {
				    if ((element.value !== undefined && element.value.length > 0) || $(this).attr('placeholder') !== null) {
				        $(this).siblings('label').addClass('active');
				    }
				    else {
				        $(this).siblings('label').removeClass('active');
				    }
				});

			
			$('#contactPersonName_'+currentModId).val(existingContractServiceAgreementNumberModules[0].ContactPerson);
			$('#contactPersonEmail_'+currentModId).val(existingContractServiceAgreementNumberModules[0].ContactPersonEmail);
			$('#contactPersonPhone_'+currentModId).val(existingContractServiceAgreementNumberModules[0].ContactPersonMobile);
			$('#renewalDate_'+currentModId).val((existingContractServiceAgreementNumberModules[0].Renewal_x0020_Date).split('T')[0]);
			$('#frequency_'+currentModId).val(existingContractServiceAgreementNumberModules[0].Frequency);
			$('#MaintenanceFreqMonthSelector_'+currentModId).val(existingContractServiceAgreementNumberModules[0].MaintenanceFreqMonthSelector);
			$('input[id="contactPersonName_'+currentModId+'"],input[id="contactPersonPhone_'+currentModId+'"],input[id="contactPersonEmail_'+currentModId+'"],input[id="frequency_'+currentModId+'"],input[id="MaintenanceFreqMonthSelector_'+currentModId+'"],input[id="renewalDate_'+currentModId+'"]').prop('disabled', true);			
			}
			else
			{
				$('input[id="contactPersonName_'+currentModId+'"],input[id="contactPersonPhone_'+currentModId+'"],input[id="contactPersonEmail_'+currentModId+'"],input[id="frequency_'+currentModId+'"],input[id="MaintenanceFreqMonthSelector_'+currentModId+'"],input[id="renewalDate_'+currentModId+'"]').prop('disabled', false);
			}
		})
    })
   

    
    
    //Add New Models
    $("#ModelAdd").click(function(){
    	AddModel(LoadedModelsData, nextModelId);
    	$('#previousattachmentsModulesAll_'+ (nextModelId-1)).hide();
    });
    
    function AddModel(paramLoadedModelsData, CurrentmodelId)
    {
    var Modelid = CurrentmodelId;
    nextModelId = CurrentmodelId;
    $('#ModelsSection').append(    '        <ul class="collapsible" id="ModelCollapsible_'+ Modelid +'">   '+
			'		    <li class="active">   '+
			'		      <div class="collapsible-header"><i class="material-icons">   '+
			'				devices_other</i>Module&nbsp;'+ Modelid +'<span class="badge"><i class="material-icons">unfold_less</i></span></div>   '+
			'		      <div class="collapsible-body">   '+
			'		      		<div class="row" id="ModelRow_'+ Modelid +'">   '+
            '                       <div class="input-field col s12 m4">   '+
            '                           <i class="material-icons prefix">   '+
			'							text_format</i>   '+
            '                           <label>Model Name <Span class="red-text text-accent-4">   '+
			'							*</Span></label>   '+
            '                           <input type="text" name="modelName" id="modelName_'+ Modelid +'" value="" required    '+
            '                               class="validate modelName mat-input" />   '+
            '                       </div>   '+
            '                      <div class="input-field col s12 m4">   '+
            '                           <i class="material-icons prefix">   '+
			'							account_balance</i>   '+
            '                           <label>Contract Company <Span class="red-text text-accent-4">   '+
			'							*</Span></label>   '+
            '                           <input type="text" name="contractCompany" id="contractCompany_'+ Modelid +'" value="" required class="validate contractCompany mat-input" />   '+
            '                       </div>   '+
            '                       <div class="input-field col s12 m4">   '+
            '                           <i class="material-icons prefix">   '+
			'							store</i>   '+
            '                           <label>Model Manufacturer <Span class="red-text text-accent-4">   '+
			'							*</Span></label>   '+
            '                           <input type="text" name="modelManufacture" id="modelManufacture_'+ Modelid +'" value="" required class="validate modelManufacture mat-input" />   '+
			'                        </div>   '+
            '                   </div>   '+
            '                   <div class="row">   '+
            '                       <div class="input-field col s12 m4">   '+
            '                           <i class="material-icons prefix">   '+
			'							confirmation_number</i>   '+
            '                           <label>Serial Number<Span class="red-text text-accent-4">*</Span></label>   '+
            '                           <input type="text" name="serialNumber" id="serialNumber_'+ Modelid +'" value="" required class="validate serialNumber mat-input" />   '+
            '                       </div>   '+
            '                       <div class="input-field col s12 m8">   '+
            '                           <i class="material-icons prefix">   '+
			'							comment</i>   '+
			'							<label for="textarea1">Comments</label>	   '+	
            '                           <textarea id="comments_'+ Modelid +'" class="materialize-textarea  comments mat-input"></textarea>   '+
            '						</div>   '+
            '                   </div>   '+                        
            '                    <div class="row">   '+
            '                       <div class="input-field col s12 m4">   '+
            '                           <i class="material-icons prefix">   '+
			'							content_paste</i>   '+
            '                           <select required class="validate isHavingServiceAgreement" name="isHavingServiceAgreement" id="isHavingServiceAgreement_'+ Modelid +'">   '+
            '                           </select>   '+
            '                           <label>Is having Service Agreement?<Span class="red-text text-accent-4">*</Span></label>   '+
            '                       </div>   '+
                        '                       <div class="input-field col s12 m4 contractGroup_'+ Modelid +'">   '+
			'                           <i class="material-icons prefix">   '+
			'							confirmation_number</i>   '+
            '                           <label>Contract/Service Agreement#</label>   '+
            '                           <input type="text" name="contractServiceAgreementNumber" id="contractServiceAgreementNumber_'+ Modelid +'" value="" class="validate contractServiceAgreementNumber mat-input" />   '+
            '                       </div>   '+

            '                       <div class="input-field col s12 m4 contractGroup_'+ Modelid +'">   '+
            '                           <i class="material-icons prefix">   '+
			'							account_box</i>   '+
            '                           <label>Contact Person Name</label>   '+
            '                           <input type="text" name="contactPersonName" class=" contactPersonName mat-input" id="contactPersonName_'+ Modelid +'" />   '+
            '                       </div>   '+
            '                   </div>          '+            
            '                    <div class="row">   '+
            '                       <div class="input-field col s12 m4  contractGroup_'+ Modelid +'" >   '+
            '                           <i class="material-icons prefix">   '+
			'							date_range</i>   '+
			  '                           <label>Start Date</label>   '+
            '                           <input type="text" name="renewalDate" id="renewalDate_'+ Modelid +'" class="datepicker  datefocus renewalDate mat-input"/>   '+
            '                       </div>   '+
                    '                <div class="input-field col s12 m2 contractGroup_'+ Modelid +'">   '+    
                    '                    <i class="material-icons prefix">       '+
			 		'					repeat</i>       '+
                    '                    <label>Frequency</label>       '+
                    '                    <input type="number" placeholder="0" min="0" max="60" name="frequency" id="frequency_'+ Modelid +'"  class="validate frequency mat-input" />   '+
                    '                </div>   '+
                    '                <div class="input-field col s12 m1 contractGroup_'+ Modelid +'" style="margin-left: -19px;">          '+
                    '                    <label>times in</label>     '+
                    '                </div>   '+
                    '                <div class="input-field col s12 m1 contractGroup_'+ Modelid +'" style="margin-left: -19px;">       '+   
                    '                    <input type="number" placeholder="0" min="0" max="36" id="MaintenanceFreqMonthSelector_'+ Modelid +'" class="validate MaintenanceFreqMonthSelector  mat-input" />     '+
                    '                </div>   '+
                    '                <div class="input-field col s12 m1 contractGroup_'+ Modelid +'"  style="margin-left: -19px;">       '+   
                    '                    <label>month/s</label>     '+
                    '                </div>	   '+
                    '                <div class="input-field col s12 m3 contractGroup_'+ Modelid +'"  style="margin-left: -19px;">       '+   
                    '                    <a data-position="top" data-tooltip="Select Start Date, Frequency and months for schedule details" class=" tooltipped btn waves-effect waves-light btn-medium z-depth-2 maintenenceschedule " id="MaintenenceSchedule_'+ Modelid +'">   '+
					'					Maintenence Schedule<i class="material-icons right">update</i></a>     '+
                    '               </div>   '+	
            '                   </div>   '+	
            '                   <div class="row">	   '+
            '                       <div class="input-field col s12 m4 contractGroup_'+ Modelid +'">   '+
            '                           <i class="material-icons prefix">   '+
			'							contact_mail</i>   '+
            '                           <label>Contact Person Email</label>   '+
            '                           <input  type="email" name="contactPersonEmail" id="contactPersonEmail_'+ Modelid +'" class="validate contactPersonEmail mat-input" />   '+
            '                           <span class="helper-text" data-error="Please enter valid Email ID" data-success=""></span>   '+
            '                       </div>   '+
            '                       <div class="input-field col s12 m4 contractGroup_'+ Modelid +'">   '+
            '                           <i class="material-icons prefix">   '+
			'							contact_phone</i>   '+
            '                           <label>Contact Person Phone</label>   '+
            '                           <input  type="number"  name="contactPersonPhone" id="contactPersonPhone_'+ Modelid +'" value="" class="validate contactPersonPhone mat-input" />   '+
            '                       </div>            '+   
            '						<div  class="right-align" style="padding-top: 25px;">      '+
			'	                   		 <a class="waves-effect waves-light btn-small deleteModel" id="DeleteModel_'+ Modelid +'"><i class="material-icons right">remove_circle_outline</i>Remove Module&nbsp'+ Modelid +'</a>      '+
			'	                    </div>     <input type="text" id="upcomingLatestScheduledMaintananceDateModule_'+ Modelid +'" class="upcomingLatestScheduledMaintananceDateClassModule_'+ Modelid +'" style="display:none"/>'+
            '                   </div>   <input  type="text" style="display:none" id="AttachDel_'+ Modelid +'" /><input  type="number" style="display:none" id="ModuleListItemId_'+ Modelid +'" />  <div id="previousattachmentsModulesAll_'+ Modelid +'" class="card-panel" style="    min-height: 75px;"></div>'+
				'	<div class="row FileUploadControl">	'+
                '        <div class="file-field input-field">	'+
				'	      <div class="btn">	'+
				'	        <span>File&nbsp;<i class="material-icons">attachment</i> </span>	'+
				'	        <div id="attachFilesHolderModel_'+ Modelid +'"><input type="file" id="FileUploadControlModel_'+ Modelid +'" multiple/> </div>	'+
				'	      </div>	'+
				'	      <div class="file-path-wrapper">	'+
				'	        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>	'+
				'	      </div>	'+
				'	    </div>    	'+               
				'	</div>' +
			'		      </div>   '+
			'		    </li>   '+
			'		  </ul>	   ');
			$('.collapsible').collapsible();
			$('.datepicker').datepicker({
	    	format : 'yyyy-mm-dd',
	    	autoClose: true
		    });
	    var isHavingServiceAgreementId= "isHavingServiceAgreement_"+ Modelid;
	    //var frequencyId= "frequency_"+ Modelid;
	    paramLoadedModelsData.forEach(myFunction2);
            function myFunction2(paramLoadedModelsData) {
                FormChoices(paramLoadedModelsData, "IsHavingServiceAgreement", isHavingServiceAgreementId);
                //FormChoices(paramLoadedModelsData, "Frequency", frequencyId);
            }
            $("#isHavingServiceAgreement_"+ Modelid+"").val('No');
            $('select').formSelect();
            modelMaintainenceScheduleSidebar(Modelid);
		    $('.contractGroup_'+ Modelid).hide();
            $("#DeleteModel_"+ Modelid +"").css("background-color", "#ff80ab"	); 
    	nextModelId++;
    	$("#ModelNumberIncrement").html(nextModelId);	
    }
    //Add Model End
    
    function modelMaintainenceScheduleSidebar(Modelid)
    {
    	$('#modelMaintainenceScheduleSidebar').append(
    					'		  <div id="modalMaintenenceSchedule_'+ Modelid +'" class="sidenav side_'+Modelid +' center-align" style="width: 50% !important ; height: 100% !important ;">       '+
			'			<div  style="display:block;float:left;background: #039be5;">       '+
			'				<h4 class="center-align" style="color:white"><i class="material-icons medium" style="    font-size: 3rem;">update</i></h4>       '+
			'			</div>       '+
			'			<div  style="display:block;padding-top: 1px;padding-bottom: 15px;background: #039be5;">       '+
			'				<h4 class="center-align" style="color:white"> Maintenence Schedule</h4>       '+
			'			</div>       '+
			'			<div id="carousalid_'+ Modelid +'" class="carousel carousel'+Modelid +'"  style=""></div>	       '+
			'		  </div>       '
    	);
    }
    
    $('body').on('click', '.maintenenceschedule' , function() {//$('#MaintenenceSchedule').click(function(){
    //alert();
    var Modelid= ($(this).attr('id')).split("_")[1];
    $("#carousalid_"+ Modelid).empty();
    $('.side_'+Modelid).sidenav();
    $('.side_'+Modelid).sidenav('open');
      
    var newDate = addDays(new Date($('#renewalDate_'+ Modelid).val()+"T07:00:00Z"), 0);
    for(var i=1;i<=$('#frequency_'+ Modelid).val();i++)
    {    	
		newDate = addDays(newDate , 30*($('#MaintenanceFreqMonthSelector_'+ Modelid).val()/$('#frequency_'+ Modelid).val()));//newDate.addDays(4);
   		$("#carousalid_"+ Modelid).append(		'  <div class="carousel-item card medium" style="">	<div style="    margin-top: 10px;"><span style="font-size:16px;">Scheduled Maintenence: '+i+'</span></div>'+		
		'	<div class="card-content">	'+
		'	  <span class="card-title activator grey-text text-darken-4"><i class="material-icons center" style="    ;">date_range</i>	'+
		'	<span style="    font-size: ;">'+newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate()+'<i class="material-icons center">more_vert</i></span>	'+
		'	  <p><a href="#"></a></p>	'+
		'	</div>	'+
		'	<div class="card-reveal">	'+
		'	  <span class="card-title grey-text text-darken-4">	<i class="material-icons center" style="    ;">date_range</i>	'+
		'	<span style="    font-size: ;">'+newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate()+'</span><i class="material-icons center">close</i></span>	'+
		'	  <p>Only latest/first upcoming Schedule can be edited in Edit form!</p>	'+
		'	</div>	'+
		' </div>	');
	}
	$('.carousel'+Modelid).carousel();      
    });


	var modelDeleted = []
	$('body').on('click', '.deleteModel', function() {
		debugger;
		var g=$(".collapsible").filter(function() { return $(this).css("display") == "none" }).length;
		if(nextModelId-g==1)//for min 1 module->if(nextModelId-g==2)
		{
			$('.modal.bb').modal();
			$('.modal.bb').modal('open');
		}
		else
		{
			var modelId = ($(this).attr('id')).split("_")[1];
			if (confirm("Confirm remove Module "+modelId +"?" )) {
				if($("#ModuleListItemId_"+ modelId).val())
				{existingModulesToBeDeleted.push($("#ModuleListItemId_"+ modelId).val());}
				console.log(existingModulesToBeDeleted);
			  	modelDeleted .push(modelId );
			    //console.log(modelDeleted );// do something
			    $("#ModelCollapsible_"+ modelId).hide();
			    $('#contactPersonName_'+ modelId).prop('required', false);
		    	$('#contractServiceAgreementNumber_'+ modelId).prop('required', false);
	    		$('#contactPersonPhone_'+ modelId).prop('required', false);
	    		$('#contactPersonEmail_'+ modelId).prop('required', false);
	    		$('#modelName_'+ modelId).prop('required', false);
		    	$('#contractCompany_'+ modelId).prop('required', false);
	    		$('#modelManufacture_'+ modelId).prop('required', false);
	    		$('#serialNumber_'+ modelId).prop('required', false);
			  	//$(location).attr('href', 'https://cospfx.sharepoint.com/sites/DenTheMark/SitePages/Dashboard.aspx')
			} else {
			  //txt = "You pressed Cancel!";
			}
		}
	});
	var IsFormValid;
	
	function checkEmptyValues(elementId, fieldName)
	{
		var varElementId = '#' + elementId + '';
		if($.trim($(varElementId).val()).length == 0)
		{
		alert(fieldName+ ' is mandatory');
		IsFormValid = false;
		}
	}
	$("#addNewInstrument").attr("href", _spPageContextInfo.webAbsoluteUrl + "/SitePages/NewInstrument.aspx");
	$("#goToDashboard").attr("href", _spPageContextInfo.webAbsoluteUrl +"/SitePages/Dashboard.aspx");
	function checkDuplicateInstruments()
	{
		$.when(getItemsByUrlAsync("/_api/web/lists/GetByTitle('"+InstrumentsListName +"')/items?$select=*&$filter=EquipmentName eq '"+ $('#equipmentName').val() +"'")).then(function (isDuplicateData) {
			console.log(isDuplicateData);
			if(isDuplicateData.length>0)
			{
				alert("Equipment with same name exists already!");IsFormValid =false;}
		})
	}
	
	$('#equipmentName').focusout(function(){
		if($('#equipmentName').val() != BeforeChangeEquipmentDate)
		{
		$('#equipmentType').val('');
		$('#equipmentType').prop('disabled', false);
		$.when(getItemsByUrlAsync("/_api/web/lists/GetByTitle('"+InstrumentsListName +"')/items?$select=*&$filter=EquipmentName eq '"+ $('#equipmentName').val() +"'")).then(function (isDuplicateData) {
			if(isDuplicateData.length>0 && ($('#equipmentName').val() != BeforeChangeEquipmentDate) && ($.trim($('#equipmentName').val()).length > 0)){
			$('.modal.duplicateInstrument').modal();
			$('.modal.duplicateInstrument').modal('open');
			$("#duplicateInstrumentLink").attr("href", _spPageContextInfo.webAbsoluteUrl +"/SitePages/ReviewItem.aspx?ItemId="+isDuplicateData[0].Id+"&pagetype=Edit");
			}
		})
		$.when(getItemsByUrlAsync("/_api/web/lists/GetByTitle('"+EquipmentNameTypeMappingListName +"')/items?$select=EquipmentType&$filter=Title eq '"+ $('#equipmentName').val() +"'")).then(function (receivedMappingItem) {
			if(receivedMappingItem.length == 1)
			{
				var isEqTypePresent=false ;
				var opts= $('#equipmentType')[0].options;
				$.each(opts , function (key, value) {
                if(opts[key].value == receivedMappingItem[0].EquipmentType)
                {
                	isEqTypePresent = true;
                }
            	});
            	if(isEqTypePresent)
            	{
            		$('#equipmentType').val(receivedMappingItem[0].EquipmentType);
            	}
            	else
            	{
		            var newoptions = '<option value="' + receivedMappingItem[0].EquipmentType + '">' + receivedMappingItem[0].EquipmentType + '</option>';
		            $('#equipmentType').append(newoptions);
		            $('#equipmentType').val(receivedMappingItem[0].EquipmentType);
            	}
            	$('#equipmentType').prop('disabled', true); 
            	$('select').formSelect();           	
			}
		})
		$('select').formSelect();
		}	
	})
	var AllModelData2= [];
	function validateForm()
	{	IsFormValid = true;
		checkEmptyValues('equipmentName','Equipment Name');
		checkEmptyValues('manufacture','Manufacturer');
		checkEmptyValues('manufactureYear','Manufacture Year');
		checkEmptyValues('locationRoom','Location Room');
		checkEmptyValues('responsibleEmployee','Responsible Employee');		
		
	    generateResultedModulesAfterDeletion(51);
		console.log(AllModelData2);
		for (var i = 0; i < AllModelData2.length; i++) 
	    {
	    	var currentmodNo=(AllModelData2[i].Title).split('_')[1];
	    	checkEmptyValues('modelName_'+currentmodNo,'Model ' +currentmodNo+': Model Name ');
	    	checkEmptyValues('modelManufacture_'+currentmodNo,'Model ' +currentmodNo+': Model Manufacture ');
	    	checkEmptyValues('serialNumber_'+currentmodNo,'Model ' +currentmodNo+': Serial Number ');
	    	checkEmptyValues('contractCompany_'+currentmodNo,'Model ' +currentmodNo+': Contract Company ');
	    }
		return IsFormValid ;
	}
	
	function generateResultedModulesAfterDeletion(itemIdPassed)
	{
		for (var i = 1; i < nextModelId; i++) 
	    {
	    	var renewaldate;
	    	
	    	
	        if($('#renewalDate_'+i).val())
			{
				renewaldate=$('#renewalDate_'+i).val()+"T07:00:00Z";			
				var lastMaintenenceDate ;
				var isupcomingMaintenenceDateCaptured=false;
				var newrenDate = addDays(new Date(($('#renewalDate_'+i).val())+"T07:00:00Z"), 0);
			    for(var j=1;j<=$('#frequency_'+i).val();j++)
			    {    	
					newrenDate = addDays(newrenDate , 30*($('#MaintenanceFreqMonthSelector_'+i).val()/$('#frequency_'+i).val()));//newDate.addDays(4);
					if(!isupcomingMaintenenceDateCaptured && (newrenDate >new Date()) )
					{
						isupcomingMaintenenceDateCaptured= true;
						upcomingMaintenenceDate = newrenDate ;
					}
					lastMaintenenceDate =newrenDate ;				
				}
				if(!isupcomingMaintenenceDateCaptured)
				{
					upcomingMaintenenceDate = lastMaintenenceDate ;
				}
			}
			
			if($('#isHavingServiceAgreement_'+i).val()!="Yes")
			{
				upcomingMaintenenceDate =null;
			   	$('#contractServiceAgreementNumber_'+i).val('');
				$('#contactPersonName_'+i).val('');
				$('#contactPersonEmail_'+i).val('');
				$('#contactPersonPhone_'+i).val('');
				$('#renewalDate_'+i).val('');
				$('#frequency_'+i).val('');
				$('#MaintenanceFreqMonthSelector_'+i).val('');
	    	}		

	    	if($('#renewalDate_'+i).val())
			{renewaldate=$('#renewalDate_'+i).val()+"T07:00:00Z";}
			else
			{renewaldate=null}
	    	AllModelData2[i-1]= {
            __metadata: {
                'type': 'SP.Data.'+ModelsListName +'ListItem'
            },
            Title: 'JSF_'+i+'_'+new Date().toISOString(),
            Name: $('#modelName_'+i).val(),
            Manufacturer: $('#modelManufacture_'+i).val(),
            SerialNumber: $('#serialNumber_'+i).val(),
            ContractCompany: $('#contractCompany_'+i).val(),
            Renewal_x0020_Date: renewaldate,
            IsHavingServiceAgreement: $('#isHavingServiceAgreement_'+i).val(),
            ContactPerson: $('#contactPersonName_'+i).val(),
            ContactPersonEmail: $('#contactPersonEmail_'+i).val(),
            ContactPersonMobile: parseFloat($('#contactPersonPhone_'+i).val()),
            Frequency: $('#frequency_'+i).val(),
            Comments: $('#comments_'+i).val(),
            EquipmentIdId: itemIdPassed,//for testing taking dummy ID //parseInt(response.d.Id),
            ContractServiceAgreementNumber: $('#contractServiceAgreementNumber_'+i).val(),
            MaintenanceFreqMonthSelector: parseFloat($('#MaintenanceFreqMonthSelector_'+i).val()), 
            UpcomingMaintenenceDate: upcomingMaintenenceDate
        	}
	    }
	    for (var j = 0; j < modelDeleted.length; j++) 
	    {
	    	for (var k = 0; k < AllModelData2.length; k++) 
	    	{
				if((AllModelData2[k].Title).split('_')[1] == modelDeleted[j])
	    		{AllModelData2.splice(k, 1);}
	    	}
	    } 
	}
	var formSubmitType = "";
	$('[name="submitSaveandContinue"]').hover(function(){
  		setSaveandContinueVariable();
  	})
  	$('[name="submitSaveandContinue"]').focus(function(){
  		setSaveandContinueVariable();
  	})
  	function setSaveandContinueVariable()
  	{formSubmitType = "SContinue";}

  	$('[name="submit"]').hover(function(){
  		setSaveandCloseVariable();
  	})
  	$('[name="submit"]').focus(function(){
  		setSaveandCloseVariable();
  	})
  	function setSaveandCloseVariable()
  	{formSubmitType = "SClose";}

	
  	
	
	$("form").submit(function(){
	$('[name="submit"],[name="submitSaveandContinue"]').prop("disabled", true);
	//console.log($('input[name="submitSaveandContinue"]'));
	//console.log($('input[name="submit"]'));

	if($('#IsCriticalEquipemnt ').val() == 'Yes' && $('#criticalIstrument').val() == 'Yes')
	{$('.modal.modalcriticalEquipInstrWarning').modal('open');return false;}
	else{    SubmitForm();	return false;}    
  	});
  	
  	$('#criticalEquipInstrWarningbtn').click(function(){
  		$('.modal.modalcriticalEquipInstrWarning').modal('close'); SubmitForm();	return false; 
  	})
  	$('#criticalEquipInstrClosebtn').click(function(){
  		$('[name="submit"],[name="submitSaveandContinue"]').prop("disabled", false);
  	})  	
	
	function SubmitForm()
	{
		
		if(!validateForm())
		{//alert("Submmitted");
		$('[name="submit"],[name="submitSaveandContinue"]').prop("disabled", false);
		return false;
		}    
		$.when(getItemsByUrlAsync("/_api/web/lists/GetByTitle('"+InstrumentsListName +"')/items?$select=*&$filter=EquipmentName eq '"+ $('#equipmentName').val() +"'")).then(function (isDuplicateData) {
			console.log(isDuplicateData);
			if(isDuplicateData.length>0  && ($('#equipmentName').val() != BeforeChangeEquipmentDate) )
			{
				alert("Equipment with same name exists already!");//IsFormValid =false;
				$('[name="submit"],[name="submitSaveandContinue"]').prop("disabled", false);
				return false;
			}
		if($('#equipmentType').val()=='Analytical Instrument'  && $('#criticalIstrument').val() == 'Yes') 
		{
			if($( '#IsCriticalEquipemnt ').val() != 'Yes')
				{alert('Equipment Type is "Analytical Instrument" and Critical Instrument is "Yes", Please select Critical Equipemnt as "Yes" to proceed');//IsFormValid =false;
				$('[name="submit"],[name="submitSaveandContinue"]').prop("disabled", false);
				return false;
				}
		}
					
        var BackupResponsibleId;
        var responsibleEmployeeId;
        if (latestBackupResponsibleAutocompleteCollection && $('#backupResponsible').val()) {
            $.each(latestBackupResponsibleAutocompleteCollection, function (key, value) {
                if (key == $('#backupResponsible').val()) {
                    BackupResponsibleId = latestBackupResponsibleAutocompleteCollection[key];
                }
            });
        }
        else
        {BackupResponsibleId = -1}
        if (latestResponsibleEmployeeAutocompleteCollection && $('#responsibleEmployee').val()) {
            $.each(latestResponsibleEmployeeAutocompleteCollection, function (key, value) {
                if (key == $('#responsibleEmployee').val()) {
                    //alert(key);
                    responsibleEmployeeId = latestResponsibleEmployeeAutocompleteCollection[key];
                }
            });
        }
        else
        {responsibleEmployeeId = -1}
        var renewaldateI;
        if(!($('#isActive').prop('checked')))
    	{$('#method').val("");}

    	if(!($('#equipmentType').val()=='Analytical Instrument'))
    	{
	    	$('#MethodsUniqueToInstrument').val('')
    	}
    	if($('#isHavingServiceAgreementI').val()=='No')
    	{
	    	$('#contractServiceAgreementNumberI').val('');
	    	$('#Price').val('');
			$('#contactPersonNameI').val('');
			$('#contactPersonEmailI').val('');
			$('#contactPersonPhoneI').val('');
			$('#renewalDateI').val('');
			$('#frequencyI').val('');
			$('#MaintenanceFreqMonthSelector').val('');
    	}
    	
    	var upcomingMaintenenceDate ;
    	var varRiskAssessmentDate;
    	if($('#riskAssessmentDate').val())
		{
    		varRiskAssessmentDate = $('#riskAssessmentDate').val()+"T07:00:00Z";
    	}
        if($('#renewalDateI').val())
		{			
			var lastMaintenenceDate ;
			var isupcomingMaintenenceDateCaptured=false;
			renewaldateI=$('#renewalDateI').val()+"T07:00:00Z";
			var newrenDate = addDays(new Date($('#renewalDateI').val()+"T07:00:00Z"), 0);
		    for(var i=1;i<=$('#frequencyI').val();i++)
		    {    	
				newrenDate = addDays(newrenDate , 30*($('#MaintenanceFreqMonthSelector').val()/$('#frequencyI').val()));//newDate.addDays(4);
				if(!isupcomingMaintenenceDateCaptured && (newrenDate >new Date()) )
				{
					isupcomingMaintenenceDateCaptured= true;
					upcomingMaintenenceDate = newrenDate ;
				}
				lastMaintenenceDate =newrenDate ;				
			}
			if(!isupcomingMaintenenceDateCaptured)
			{
				upcomingMaintenenceDate = lastMaintenenceDate ;
			}
			if($('#upcomingLatestScheduledMaintananceDate1').val() != undefined)
			{upcomingMaintenenceDate= $('#upcomingLatestScheduledMaintananceDate1').val()+"T07:00:00Z";}
		}
    		
    	

		var pcNameData;
		if(($('#pcBackup').val()).indexOf('Yes') > -1)
		{pcNameData = parseInt($('#pC').val())}
        var InstrumentData = {
            __metadata: {
                'type': 'SP.Data.'+InstrumentsListName +'ListItem'
            },
            Title: 'JSF',
            EquipmentName: $('#equipmentName').val(),
            Model: $('#model').val(),
            CriticalInstrument: $('#criticalIstrument').val(),
            EquipmentType: $('#equipmentType').val(),
            IsCriticalEquipemnt : $('#IsCriticalEquipemnt').val(),
            PCBackupInternet: $('#pcBackup').val(),
            LocationRoomNo: $('#locationRoom').val(),
            Manufacturer: $('#manufacture').val(),
            ManufacturingYearInstallation: $('#manufactureYear').val(),
            Method: {"results":$('#method').val()}, //"{'__metadata':{'type':'Collection(Edm.String)'},results:['all']}",//'{"__metadata":{"type":"Collection(Edm.String)"},"results":['+$('#method').val()+']}',//'["Value1","Value2","Value3"]} //$('#method').val(),
            ResponsibleEmployeeId: responsibleEmployeeId,
            MethodsUniqueToInstrument : {"results":$('#MethodsUniqueToInstrument').val()},
            BackupResponsibleId: BackupResponsibleId,
            IsActive: $('#isActive').prop('checked'),
            PCId: pcNameData ,
            RiskAssessmentDate: varRiskAssessmentDate ,
            Renewal_x0020_Date: renewaldateI,
            IsHavingServiceAgreement: $('#isHavingServiceAgreementI').val(),
            ContactPerson: $('#contactPersonNameI').val(),
            ContactPersonEmail: $('#contactPersonEmailI').val(),
            ContactPersonMobile: parseFloat($('#contactPersonPhoneI').val()),
            Price : parseFloat($('#Price').val()),
            Renewal_x0020_Date: renewaldateI,
            ModificationYear : $('#ModificationYear').val(),
            Frequency: $('#frequencyI').val(),
            MaintenanceFreqMonthSelector: parseFloat($('#MaintenanceFreqMonthSelector').val()), 
            Comments: $('#commentsI').val(),
            InstallationYear: $('#InstallationYear').val(),
            ContractServiceAgreementNumber: $('#contractServiceAgreementNumberI').val(),
            UpcomingMaintenenceDate: upcomingMaintenenceDate
        }
        $.when(updateItem(InstrumentsListName, id, concurancyCheckCurrentItem, InstrumentData ),DeleteItemAttachment(InstrumentsListName, id, FileTitleArray)).then(function (updateStatusFlag, attachmentDeleteFlag) {
                if (updateStatusFlag && attachmentDeleteFlag) {
                    var NewInstrumentID = id;                    
                    generateResultedModulesAfterDeletion(NewInstrumentID );
				    var existingModulesUpdatableArray=[];
                    var newModulesCreatableArray=AllModelData2;
                    var modulesToBeignored=[];
                    for(var e=0;e<AllModelData2.length;e++)
                    {
                    	for(var u=0;u<modelPresent.length;u++)
                    	{
                    		if((AllModelData2[e].Title).split('_')[1] == modelPresent[u])
                    		{
                    			existingModulesUpdatableArray.push(AllModelData2[e]);
                    			modulesToBeignored.push((AllModelData2[e].Title).split('_')[1]);
                    			//newModulesCreatableArray.splice(e, 1);
                    		}
                    	}
                    }
                    for(var e=0;e<modelPresent.length;e++)
                    {
                    	newModulesCreatableArray.splice(0, 1);
                    }
				                        
                    $.when(updateItemsFromArray(ModelsListName , "Test" , existingModulesUpdatableArray),addNewItemsFromArray(ModelsListName , newModulesCreatableArray)).then(function (response,IsModulesAdded) {
                            if (response && IsModulesAdded) {
                                var filesvar=$("#attachFilesHolder input:file");
	   						    var files= filesvar[0].files;
	   						    deleteItem(ModelsListName ,existingModulesToBeDeleted, "Test");
								if(files.length == 0)
								{
									console.log(formSubmitType );
					                if(formSubmitType  == "SClose")
									{
						                $('.modal.aa').modal('open');				                
						                $('#SubmitModalHeader').append('<h4 style="color:green"><i class="material-icons medium">done</i>&nbspEquipment updated successfully!(ID: ' + NewInstrumentID + ')</h4>');
	                            	}
	                            	else if(formSubmitType  == "SContinue")
	                            	{	$(window).unbind('beforeunload');
	                            		location.reload();
	                            	}
	                            }
	                            else
	                            {
	                            	AddAttachments(NewInstrumentID);                            	
	                            }
                            }
                        },
                        function (response) {
                            if (response.status) {
                                 
                                $('.modal.aa').modal('open');
                                $('#SubmitModalHeader').append('<h4 style="color:red"><i class="material-icons medium">error</i>&nbspSomething went wrong! </br><p style="color:black">Please try again, if issue persists please contact administrator</p></h4>');
                            }
                        });
                }
            },
            function (response) {
                if (response.status) {
                     
                    $('.modal.aa').modal('open');
                    $('#SubmitModalHeader').append('<h4 style="color:red"><i class="material-icons medium">error</i>&nbspSomething went wrong! </br><p style="color:black">Please try again, if issue persists please contact administrator</p></h4>');
                }
            })
        })
    }
    
 	function AddAttachments(CreatedItemId)
 	{
    var arraycount = 0;  
    var fileUploadeCount = 0; 
    var listItem = "";  
    var fileArray = [];  
    var filesvar=$("#attachFilesHolder input:file");
    var files= filesvar[0].files;
    $.each(files, function (key, value) {
    	fileArray.push({ "Attachment": files[key] });
    });

    arraycount = fileArray.length;
    var filearray = fileArray;
    if (fileArray.length != 0) {  
        for (i = 0; i <= filearray.length - 1; i++) {  
			 var listname = InstrumentsListName;
            loopFileUpload(listname, CreatedItemId, filearray, i).then(  
                function () {  
                },  
                function (sender, args) {  
                    console.log("Error uploading");  
                    dfd.reject(sender, args);  
                }  
            );  
        }  
    }
    
    function loopFileUpload(listName, id, filearray, fileCount) {  
        var dfd = $.Deferred();  
        uploadFile(listName, id, filearray[fileCount].Attachment); return dfd.promise();  
    }  
    function uploadFile(listname, ID, file) {  
        var getFileBuffer = function (file) {  
  
            var deferred = $.Deferred();  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
                deferred.resolve(e.target.result);  
            }  
            reader.onerror = function (e) {  
                deferred.reject(e.target.error);  
            }  
            reader.readAsArrayBuffer(file);  
            return deferred.promise();  
        };  
  
        getFileBuffer(file).then(function (buffer) {  
            $.ajax({  
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listname + "')/items(" + ID + ")/AttachmentFiles/add(FileName='" + file.name + "')",  
                method: 'POST',  
                async: false,  
                data: buffer,  
                processData: false,  
                headers: {  
                    "Accept": "application/json; odata=verbose",  
                    "content-type": "application/json; odata=verbose",  
                    "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value  
  
                }, success: onAttachmentSucess , error: onAttachmentError
  
            });  
  
        });  
        function onAttachmentSucess() {  
            fileUploadeCount++;  
            if (arraycount == fileUploadeCount) {  
                console.log(' uploaded successfully');  
                 
                $('.modal.aa').modal('open');
                $('#SubmitModalHeader').append('<h4 style="color:green"><i class="material-icons medium">done</i>&nbspEquipment updated successfully!(ID: ' + CreatedItemId+ ')</h4>');
            }  
        }
        function onAttachmentError() {  
             
	        $('.modal.aa').modal('open');
	        $('#SubmitModalHeader').append('<h4 style="color:blue"><i class="material-icons medium">error</i>&nbspEquipment and Model/s Added/updated but attachment upload failed! </br><p style="color:black">Please goto Edit form of item to upload attachment.</p></h4>');
        }
     }
     }
     
     /*---------------------DONT DELETE--------------------------
      For future enhancement - Set Form Person fields autocomplete
    var latestResponsibleEmployeeAutocompleteCollection = {};
    $("input#responsibleEmployee.autocomplete").keydown(function () {
       	//SetPreLoaderActive();
        var htmlobj = $(this);
        $.when(getItemsByUrl("/_api/web/siteusers?$filter=substringof(%27%27,%20Title)%20eq%20true%20&$select=Id,Title,Email")).then(function (usersData) {
            console.log(usersData);
            //$(htmlobj).css("background-color", "yellow");
            var data = {};
            $.each(usersData, function (key, value) {
                data[usersData[key].Title] = null;
                latestResponsibleEmployeeAutocompleteCollection[usersData[key].Title] = usersData[key].Id;
            });
            console.log(latestResponsibleEmployeeAutocompleteCollection);
            console.log(data);
            $('.autocomplete').autocomplete('updateData', data);
        });
        //HidePreLoader();
    });

    var latestBackupResponsibleAutocompleteCollection = {};
    $("input#backupResponsible.autocomplete").keydown(function () {
        //SetPreLoaderActive();
        var htmlobj = $(this);
        $.when(getItemsByUrl("/_api/web/siteusers?$filter=substringof(%27%27,%20Title)%20eq%20true%20&$select=Id,Title,Email")).then(function (usersData) {
            console.log(usersData);
            //htmlobj).css("background-color", "yellow");
            var data = {};
            $.each(usersData, function (key, value) {
                data[usersData[key].Title] = null;
                latestBackupResponsibleAutocompleteCollection[usersData[key].Title] = usersData[key].Id;
            });
            console.log(latestBackupResponsibleAutocompleteCollection);
            console.log(data);
            $('.autocomplete').autocomplete('updateData', data);
        });
        //HidePreLoader();
    });*/
    

	
    function HidePreLoader() {
        $("#preLoader").removeClass("active");
        $("#preLoader").addClass("inactive");
        $("#preLoader").hide();
    }

    function FormChoices(Data, title, controlId) {
        if (Data.Title == title) {
            //console.log(Data.Choices.results);
            var options = "";
            var CriticalInstrumentChoices = Data.Choices.results;
            $.each(CriticalInstrumentChoices, function (key, value) {
                options += '<option value="' + value + '">' + value + '</option>';
            });
            var varControlId = '#' + controlId + '';
            $(varControlId).append(options); //.formSelect();;
            //$(varControlId).formSelect();
            //document.getElementById('anrede').innerHTML = options;
        }
    }
    
    function SetPreLoaderActive()
    {
    	$("#preLoader").show();
        $("#preLoader").removeClass("inactive");
        $("#preLoader").addClass("active");
    }
    	
});