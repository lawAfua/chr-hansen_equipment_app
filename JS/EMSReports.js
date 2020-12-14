$(document).ready(function() {
	

	function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
	}
    var testsTable;
    //var saNumbersOptionsEquipUrl = "/_api/web/lists/getByTitle('"+InstrumentsListName+"')/items?$select=ContractServiceAgreementNumber";
   // var saNumbersOptionsModulesUrl = "/_api/web/lists/getByTitle('"+ModelsListName +"')/items?$select=ContractServiceAgreementNumber";
    var EquipmentsUrl = "/_api/web/lists/getByTitle('"+InstrumentsListName+"')/items?$select=Author/Id,Author/Title,Editor/Id,Editor/Title,ResponsibleEmployee/Id,ResponsibleEmployee/Title,BackupResponsible/Id,BackupResponsible/Title,PC/Id,PC/PCName,*&$expand=PC,Author,Editor,ResponsibleEmployee,BackupResponsible";
    var modulesUrl = "/_api/web/lists/getByTitle('"+ModelsListName +"')/items?$select=*";///_api/web/lists/getByTitle('"+InstrumentsListName+"')/items?$select=Author/Id,Author/Title,Editor/Id,Editor/Title,ResponsibleEmployee/Id,ResponsibleEmployee/Title,BackupResponsible/Id,BackupResponsible/Title,PC/Id,PC/PCName,*&$expand=PC,Author,Editor,ResponsibleEmployee,BackupResponsible";
    //var allModulesUrl = "/_api/web/lists/getByTitle('"+ModelsListName +"')/items?$select=Id,EquipmentId/Id,ContractServiceAgreementNumber&$expand=EquipmentId";
   	var EquipData1 = getItemsByUrlRecursive(EquipmentsUrl );
   	var modulesData = getItemsByUrlRecursive2(modulesUrl );
   	var backupEquipData1 =EquipData1 ;
   	var backupmodulesData  =modulesData ;
   	populateSANumbers(EquipData1 ,"saNumbers");populateSANumbers(modulesData ,"saNumbers");
	populateDataTable(EquipData1 , "equipmentsTable" );
	populateModuleDataTable(modulesData , "modulesTable" );
	
	function populateSANumbers(dataforSANumbers, elementId) {
		$.each(dataforSANumbers, function (i, item) {
			if(item.ContractServiceAgreementNumber )
			{
			    $('#'+elementId).append($('<option>', { 
		        value: item.ContractServiceAgreementNumber,
		        text : item.ContractServiceAgreementNumber
		    	}));
	    	}
		});
		var optionValues =[];
		$('#saNumbers option').each(function(){
		   if($.inArray(this.value, optionValues) >-1){
		      $(this).remove()
		   }else{
		      optionValues.push(this.value);
		   }
		});
	}
	
	$('#SearchSANumber').click(function(){	    
		if($('#saNumbers').val())
		{
			populateDataTable(EquipData1.filter(function (el) {
			  return el.ContractServiceAgreementNumber == $('#saNumbers').val()
			}), "equipmentsTable" );
			populateModuleDataTable(modulesData.filter(function (el) {
  return el.ContractServiceAgreementNumber == $('#saNumbers').val()
}) , "modulesTable" );
		}
		else
		{
			populateDataTable(backupEquipData1 , "equipmentsTable" );
			populateModuleDataTable(backupmodulesData  , "modulesTable" );
		}

	})

	function populateModuleDataTable(data, elementId) {
		console.log(data);
		testsTable = $('#'+elementId+'').dataTable({
        bJQueryUI: true,
        aaData: data,
        displayLength: 25,
        deferRender:    true,
        scrollX: 				false,
        //scrollY:        200,
        scrollCollapse: true,
        scroller:       true,
        bDestroy: true,
        searching: 			false,
        paging: 				true,
        info: 					true,
        aoColumns: [
        		{ mData: 'Id' },
        		{ mData: 'Name' },
                { mData: 'Manufacturer' },
                { mData: 'ContactPerson' },
                { mData: 'ContractCompany' },
                { mData: 'IsHavingServiceAgreement' },
                { mData: 'ContractServiceAgreementNumber' },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a class="btn btn-primary" href=' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/ReviewItem.aspx?ItemId='+ data.EquipmentIdId+ '&pagetype=View' + '>' + 'View' + '</a></u>' }
	            },
                {
	                "mData": null,
	                "bSortable": false,
	               "mRender": function (data, type, full) { return '<u><a class="btn btn-primary" href=' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/ReviewItem.aspx?ItemId='+ data.EquipmentIdId+ '&pagetype=Edit' + '>' + 'Edit' + '</a></u>'; }
	            }
        ],
	    "columnDefs": [{ targets : [2],
          render : function (data, type, row) {
            switch(data) {
               case true : return 'Yes'; break;
               case false : return 'No'; break;
            }
          }
        },{
		    "defaultContent": "",
		    "targets": "_all"
		}],
			"dom": 'lBfrtip',
			buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export to Excel',
				title: 'EMSReports_Modules',
				 
				 download: 'open',
				 orientation:'landscape',
				  exportOptions: {
				  columns: ':visible'
				}
            }]

       });
       
       $('#modCount').text(data.length);
       
	}
	
	
	$(function() { 
                $("#modulesTable").table2excel({ 
                  name: "Backup file for HTML content", 
  
                  //  include extension also 
                  filename: "GFGFile.xls", 
  
    // 'True' is set if background and font colors preserved 
                  preserveColors: false  
              });         
                  
                  
            }); 

	
	function populateDataTable(data, elementId) {
		testsTable = $('#'+elementId+'').dataTable({
        bJQueryUI: true,
        aaData: data,
        displayLength: 25,
        deferRender:    true,
        scrollX: 				false,
        //scrollY:        200,
        scrollCollapse: true,
        scroller:       true,
        bDestroy: true,
        searching: 			false,
        paging: 				true,
        info: 					true,
        aoColumns: [
        		{ mData: 'Id' },
        		{ mData: 'EquipmentName' },
        		{ mData: 'IsActive' },
                { mData: 'Model' },
                { mData: 'Manufacturer' },
                { mData: 'ResponsibleEmployee.Title' },
                
                //{ mData: 'CriticalInstrument' },                        
                //{ mData: 'PC.PCName' },
                { mData: 'ContractServiceAgreementNumber' },
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
	    "columnDefs": [{ targets : [2],
          render : function (data, type, row) {
            switch(data) {
               case true : return 'Yes'; break;
               case false : return 'No'; break;
            }
          }
        },{
		    "defaultContent": "",
		    "targets": "_all"
		}],
			"dom": 'lBfrtip',
			buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export to Excel',
				title: 'EMSReports_Equipments',
				 
				 download: 'open',
				 orientation:'landscape',
				  exportOptions: {
				  columns: ':visible'
				}
            }]
       });
       $('#equipCount').text(data.length);
	}
	$('#DashboardRedirect').click(function(){
		$(location).attr('href', _spPageContextInfo.webAbsoluteUrl + '/SitePages/Dashboard.aspx');
	})
	
} );