$(document).ready(function() {
	function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
	}
    var testsTable;
    var activeinstrumentUrl = "/_api/web/lists/getByTitle('"+InstrumentsListName+"')/items?$select=Author/Id,Author/Title,Editor/Id,Editor/Title,ResponsibleEmployee/Id,ResponsibleEmployee/Title,BackupResponsible/Id,BackupResponsible/Title,PC/Id,PC/PCName,*&$expand=PC,Author,Editor,ResponsibleEmployee,BackupResponsible&$filter=IsActive eq 1";
    var inactiveinstrumentUrl = "/_api/web/lists/getByTitle('"+InstrumentsListName+"')/items?$select=Author/Id,Author/Title,Editor/Id,Editor/Title,ResponsibleEmployee/Id,ResponsibleEmployee/Title,BackupResponsible/Id,BackupResponsible/Title,PC/Id,PC/PCName,*&$expand=PC,Author,Editor,ResponsibleEmployee,BackupResponsible&$filter=IsActive eq false";
    var allModulesUrl = "/_api/web/lists/getByTitle('"+ModelsListName +"')/items?$select=Id,EquipmentId/Id,ContractServiceAgreementNumber&$expand=EquipmentId";
   	var ActiveInstrumentsData1 = getItemsByUrlRecursive(activeinstrumentUrl );
   	var InActiveInstrumentsData1 = getItemsByUrlRecursive2(inactiveinstrumentUrl );
   	var allModulesData =getItemsByUrlRecursive3(allModulesUrl ); 
	populateDataTable(ActiveInstrumentsData1, "activeinstrumentsTable" );
	populateDataTableInActive(InActiveInstrumentsData1, "InactiveinstrumentsTable" );
	var modulesSAnumberstring;
	$('#activeinstrumentsTable_paginate').click(function(){
		stateChange(-1);//alert();
	})
	$('.printLabelClass').hide();
	

	

	stateChange(-1);
            function stateChange(newState) {
                setTimeout(function () {
                    if (newState == -1) {
                        for(var k=0;k<ActiveInstrumentsData1.length;k++ )
   						{
					   		modulesSAnumberstring="";
						   for(var h=0;h<allModulesData.length;h++ )
						   {
						   		if(ActiveInstrumentsData1[k].Id==allModulesData[h].EquipmentId.Id)
						   		{
						   			if(allModulesData[h].ContractServiceAgreementNumber != null)
						   			modulesSAnumberstring= modulesSAnumberstring+ allModulesData[h].ContractServiceAgreementNumber+',';
						   		}
						   }
						   $('#SANumber_'+(ActiveInstrumentsData1[k].Id)).empty();	   
						   $('#SANumber_'+(ActiveInstrumentsData1[k].Id)).append(modulesSAnumberstring.slice(0,-1));
						}
						//$('#SANumber_40').html("Test");
						$('.dataTables_paginate a').each(function(i) {
						    $(this).css('padding-left', '8px');
						});
                    }
                }, 0000);
            }

	
	function populateDataTable(data, elementId) {
		if(elementId == "InactiveinstrumentsTable") {var flagexcelID=true}
		var excelFilePostfix = flagexcelID? "EMSReports_InactiveEquipments" : "EMSReports_ActiveEquipments";
		testsTable = $('#'+elementId+'').dataTable({
        bJQueryUI: true,
        aaData: data,
        displayLength: 10,
        deferRender:    true,
        scrollX: 				false,
        //scrollY:        200,
        scrollCollapse: true,
        scroller:       true,
        searching: 			true,
        paging: 				true,
        info: 					true,
        aoColumns: [
        		{ mData: 'IdEquipment' },
        		{ mData: 'EquipmentName' },
                { mData: 'Model' },
                { mData: 'Manufacturer' },
                { mData: 'ResponsibleEmployee.Title' },
                //{ mData: 'CriticalInstrument' },                        
                //{ mData: 'PC.PCName' },
                { mData: 'ContractServiceAgreementNumber' },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<div id="SANumber_'+ data.Id+'"></div>' }
	            },               
                /*{
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a href="#" class="btn btn-primary  printLabelClass printLabel" data-toggle="modal" data-target="#printlabelDetails" style="color: white;" id="printLabel_'+ data.Id + '"> Print Label' + '</a></u>' }
	            },*/
				{
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a href="#" class="btn btn-primary RiskAssessment" data-toggle="modal" data-target="#RiskAssessmentDetails" style="color: white;" id="RiskAssessment_'+ data.Id + '"> Risk Assessment' + '</a></u>' }
	            },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a href="#" class="btn btn-primary SafetyAssessment" data-toggle="modal" data-target="#SafetyAssessmentDetails" style="color: white;" id="SafetyAssessment_'+ data.Id + '"> Maintenance Schedule' + '</a></u>' }
	            },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a class="btn btn-primary" href=' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/ReviewItem.aspx?ItemId='+ data.Id + '&pagetype=View' + '>' + 'View' + '</a></u>' }
	            },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a class="btn btn-primary" href=' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/ReviewItem.aspx?ItemId='+ data.Id + '&pagetype=Edit' + '>' + 'Edit' + '</a></u>'; }
	            }
        ],
	    "columnDefs": [{
		    "defaultContent": "",
		    render: function (data, type, full, meta) {
                        return "<div style='white-space:normal;'>" + data + "</div>";
                    },
		    "targets": [6]
		},{
		    "defaultContent": "",
		    "targets": "_all"
		}],
			"dom": 'lBfrtip',
			buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export to Excel',
				title: excelFilePostfix ,
				 
				 download: 'open',
				 orientation:'landscape',
				  exportOptions: {
				  columns: ':visible'
				}
            }]

       });
	}
	
	function populateDataTableInActive(data, elementId) {
		if(elementId == "InactiveinstrumentsTable") {var flagexcelID=true}
		var excelFilePostfix = flagexcelID? "EMSReports_InactiveEquipments" : "EMSReports_ActiveEquipments";
		testsTable = $('#'+elementId+'').dataTable({
        bJQueryUI: true,
        aaData: data,
        displayLength: 10,
        deferRender:    true,
        scrollX: 				false,
        //scrollY:        200,
        scrollCollapse: true,
        scroller:       true,
        searching: 			true,
        paging: 				true,
        info: 					true,
        aoColumns: [
        		{ mData: 'IdEquipment' },
        		{ mData: 'EquipmentName' },
                { mData: 'Model' },
                { mData: 'Manufacturer' },
                { mData: 'LocationRoomNo' },
                { mData: 'ResponsibleEmployee.Title' },
                
                
                //{ mData: 'CriticalInstrument' },                        
                //{ mData: 'PC.PCName' },
                { mData: 'ContractServiceAgreementNumber' },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<div id="SANumber_'+ data.Id+'"></div>' }
	            },               
                /*{
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a href="#" class="btn btn-primary  printLabelClass printLabel" data-toggle="modal" data-target="#printlabelDetails" style="color: white;" id="printLabel_'+ data.Id + '"> Print Label' + '</a></u>' }
	            },*/
				{
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a href="#" class="btn btn-primary RiskAssessment" data-toggle="modal" data-target="#RiskAssessmentDetails" style="color: white;" id="RiskAssessment_'+ data.Id + '"> Risk Assessment' + '</a></u>' }
	            },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a href="#" class="btn btn-primary SafetyAssessment" data-toggle="modal" data-target="#SafetyAssessmentDetails" style="color: white;" id="SafetyAssessment_'+ data.Id + '"> Maintenance Schedule' + '</a></u>' }
	            },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a class="btn btn-primary" href=' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/ReviewItem.aspx?ItemId='+ data.Id + '&pagetype=View' + '>' + 'View' + '</a></u>' }
	            },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a class="btn btn-primary" href=' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/ReviewItem.aspx?ItemId='+ data.Id + '&pagetype=Edit' + '>' + 'Edit' + '</a></u>'; }
	            }
        ],
	    "columnDefs": [{
		    "defaultContent": "",
		    render: function (data, type, full, meta) {
                        return "<div style='white-space:normal;'>" + data + "</div>";
                    },
		    "targets": [7]
		},{
		    "defaultContent": "",
		    "targets": "_all"
		}],
			"dom": 'lBfrtip',
			buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export to Excel',
				title: excelFilePostfix ,
				 
				 download: 'open',
				 orientation:'landscape',
				  exportOptions: {
				  columns: ':visible'
				}
            }]

       });
	}
	
	$('#NewInstrumentRedirect').click(function(){
		$(location).attr('href', _spPageContextInfo.webAbsoluteUrl + '/SitePages/NewInstrument.aspx');
	})
	$('#ReportsRedirect').click(function(){
		$(location).attr('href', _spPageContextInfo.webAbsoluteUrl + '/SitePages/EMSReports.aspx');
	})

	
	//$('.modal.RiskAssessmentDetails').modal();
	$('body').on('click', ".RiskAssessment", function() {
	$('#RiskAssessmentmodalbody').empty();
	$('#modalHeadingRiskAssessment').empty();
	 var dataId = ($(this)[0].id).split('_')[1];  
	 $.when(getItemsByUrl("/_api/Web/Lists/GetByTitle('"+ InstrumentsListName +"')/Items?$select=*&$filter=Id eq "+dataId )).then(function (response) {
	 	$('#modalHeadingRiskAssessment').append("Risk Assessment for Equipment Name: "+response[0].EquipmentName+", Id: "+dataId );
	 		if(response[0].RiskAssessmentDate)
	 		{
		 		var RiskAssessmentDate = addDays(new Date(response[0].RiskAssessmentDate), 0);	 	
		 		if(RiskAssessmentDate >new Date())
				{
		 			$('#RiskAssessmentmodalbody').append('Risk Assessment: <div class="alert alert-success"><strong></strong> Next Risk Assessment Date: '+RiskAssessmentDate.toString().substring(0,15)+'</div> ');
	    		}
	    		else if(RiskAssessmentDate <new Date())
	    		{
		 			$('#RiskAssessmentmodalbody').append('Risk Assessment: <div class="alert alert-danger"><strong></strong> Previous Risk Assessment Date: '+RiskAssessmentDate.toString().substring(0,15)+'</div>  ');
	    		} 
	    	}
	    	else
    		{
    			$('#RiskAssessmentmodalbody').append('Risk Assessment: <div class="alert alert-warning"><strong>N/A</strong> No Risk Assessment Date found for this Equipment</div>  ');
    		}   		
		})
    })

	//$('.modal.SafetyAssessmentDetails').modal();
	$('body').on('click', ".SafetyAssessment", function() {
	$('#modalbody').empty();
	$('#modalHeading').empty();
	 var dataId = ($(this)[0].id).split('_')[1];  
	 $.when(getItemsByUrl("/_api/Web/Lists/GetByTitle('"+ InstrumentsListName +"')/Items?$select=*&$filter=Id eq "+dataId ), getItemsByUrl("/_api/Web/Lists/GetByTitle('"+ ModelsListName +"')/Items?$select=*&$filter=EquipmentId eq "+dataId )).then(function (response, modulesDataReceived) {
	 	$('#modalHeading').append("Equipment Name: "+response[0].EquipmentName+", Id: "+dataId );
	 	
	 	generateMaintenanceSchedule(response, false);
	 	generateMaintenanceSchedule(modulesDataReceived, true);
		})
    })
    
    //$('.modal.printlabelDetails').modal();
    $('body').on('click', ".printLabel", function() {
	$('#printlabelDetailsHeading').empty();
	$('#printlabelDetailsbody').empty();
	 var dataId = ($(this)[0].id).split('_')[1];  
	 $.when(getItemsByUrl("/_api/Web/Lists/GetByTitle('"+ InstrumentsListName +"')/Items?$select=*&$filter=Id eq "+dataId ), getItemsByUrl("/_api/Web/Lists/GetByTitle('"+ ModelsListName +"')/Items?$select=*&$filter=EquipmentId eq "+dataId )).then(function (response, modulesDataReceived) {
	 	if(response[0].ContractServiceAgreementNumber ==  null)
	 	{response[0].ContractServiceAgreementNumber="N/A"}
	 	$('#printlabelDetailsHeading').append("Equipment Name: "+response[0].EquipmentName+", Id: "+dataId+'</br>Label: '+response[0].Id+'_'+response[0].EquipmentName+'_'+response[0].ContractServiceAgreementNumber );
	 	$('#printlabelDetailsbody').append('<div class="alert alert-warning"><strong>For Modules,</strong></br><ul><li>Label format is as follow- "EquipmentId_ModuleId_ModuleName_ServiceAgreementNumber"</li><li>If Service Agreement Number not present, it will shown as "N/A"</li></ul></div>');
		$('#printlabelDetailsbody').append('<ul class="list-group">');
	 	$.each( modulesDataReceived, function( key, value ) {
	 	if(value.ContractServiceAgreementNumber ==  null)
	 	{value.ContractServiceAgreementNumber="N/A"}
	 	$('#printlabelDetailsbody').append("<li class='list-group-item'> Module Name: "+value.Name+", Id: "+value.Id+'</br>Label: '+dataId+'_'+value.Id+'_'+value.Name+'_'+value.ContractServiceAgreementNumber +'</li>');
		})
		$('#printlabelDetailsbody').append('</ul>');	
		 
	    //window.print(); 
		})
    })
    
    $('#printData').click(function(){
    
    var elem = document.getElementById("printDiv")
		
		    var domClone = elem.cloneNode(true);
    
    var $printSection = document.getElementById("printSection");
    
    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }
    
    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    
    	window.print();
    })

    
    function generateMaintenanceSchedule(response, flag)
    {
    	var maintenanceScheduleArray= [];
    	for(var j=0;j<response.length;j++)
		{
	    	var nextmaintenencedate= null;
	    	var lastMaintenenceDate = null;	    	
	        if(response[j].Renewal_x0020_Date)
			{			
				
				var isSafetyAssessmentDateCaptured=false;
				var newrenDate = addDays(new Date(response[j].Renewal_x0020_Date), 0);				
			    for(var i=1;i<=response[j].Frequency;i++)
			    {    	
					newrenDate = addDays(newrenDate , 30*(response[j].MaintenanceFreqMonthSelector/response[j].Frequency));//newDate.addDays(4);
					maintenanceScheduleArray.push(newrenDate);
					if(!isSafetyAssessmentDateCaptured && (newrenDate >new Date()) )
					{
						isSafetyAssessmentDateCaptured= true;
						nextmaintenencedate= newrenDate ;
					}
					lastMaintenenceDate =newrenDate ;				
				}
				if(!isSafetyAssessmentDateCaptured)
				{
					nextmaintenencedate= lastMaintenenceDate ;
				}
			}
			var previousPassedMaintenanceDate;
			for(var i=0;i<maintenanceScheduleArray.length;i++)
			    {    	
					if(maintenanceScheduleArray[i]<(new Date()))
					{previousPassedMaintenanceDate = 	maintenanceScheduleArray[i]}			
				}

			console.log(maintenanceScheduleArray);
			if(!previousPassedMaintenanceDate)
				{
		 			previousPassedMaintenanceDate="N/A";
	    		}			
			if(isSafetyAssessmentDateCaptured && nextmaintenencedate)
			{
				if(flag)
				{
		 			$('#modalbody').append('Maintenance Schedule for Module Name: '+response[j].Name+'<div class="alert alert-info"><strong></strong> Previous Maintenence Date: '+previousPassedMaintenanceDate.toString().substring(0,15)+'</div><div class="alert alert-success"><strong>Yes!</strong> Next Maintenence Date: '+nextmaintenencedate.toString().substring(0,15)+'</div> <div class="alert alert-info"><strong></strong> End Maintenence Date: '+lastMaintenenceDate .toString().substring(0,15)+'</div> ');
	    		}
	    		else
	    		{
		 			$('#modalHeading').append('</br>Maintenance Schedule: <div class="alert alert-info"><strong></strong> Previous Maintenence Date: '+previousPassedMaintenanceDate.toString().substring(0,15)+'</div><div class="alert alert-success"><strong>Yes!</strong> Next Maintenence Date: '+nextmaintenencedate.toString().substring(0,15)+'</div> <div class="alert alert-info"><strong></strong> End Maintenence Date: '+lastMaintenenceDate .toString().substring(0,15)+'</div> ');
	    		}    		
	    	}
	    	else
	    	if(lastMaintenenceDate)
	    	{
	    		if(flag)
				{
	    			$('#modalbody').append('Maintenance Schedule for Module Name: '+response[j].Name+' <div class="alert alert-danger"><strong>No!</strong> Previous/Last Maintenence Date: '+lastMaintenenceDate.toString().substring(0,15) +'</div> ');
	    		}
	    		else
				{
	    			$('#modalHeading').append('</br>Maintenance Schedule: <div class="alert alert-danger"><strong>No!</strong> Previous/Last Maintenence Date: '+lastMaintenenceDate.toString().substring(0,15) +'</div> ');
	    		}
	    	}
	    	
	    	if(!response[j].Renewal_x0020_Date)
			{
				if(flag)
				{
	    			$('#modalbody').append('Maintenance Schedule for Module Name: '+response[j].Name+' <div class="alert alert-warning"><strong>N/A</strong> Currently not having Service Agreement</div> ');
	    		}
	    		else
				{
	    			$('#modalHeading').append('</br>Maintenance Schedule: <div class="alert alert-warning"><strong> N/A</strong> Currently not having Service Agreement</div> ');
	    		}
			}
			
	    }
    }

} );