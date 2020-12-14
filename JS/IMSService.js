/*SP.SOD.executeFunc('SP.js', 'SP.ClientContext', function() {
var InstrumentsListName ;
var ModelsListName;
var PCsListName;

if(_spPageContextInfo.webAbsoluteUrl == "https://cospfx.sharepoint.com/sites/DenTheMark")
{InstrumentsListName = "Instruments";
ModelsListName = "Models";
PCsListName = "PCs";
}
else
{
	InstrumentsListName = "InstrumentsUAT";
	ModelsListName = "ModelsUAT";
	PCsListName = "PCsUAT";
}

var InstrumentsListName = "InstrumentsUAT";
var ModelsListName = "ModelsUAT";
var PCsListName = "PCsUAT";

    });*/
    
var InstrumentsListName = "EMSEquipments"; //"Instruments";
var ModelsListName = "EMSModules";//"Models";
var PCsListName = "PCs";
var EquipmentNameTypeMappingListName = "EquipmentNameTypeMapping";

function getFieldsData (listName) {
  var dfd = jQuery.Deferred();
 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl +"/_api/Web/Lists/GetByTitle('"+ listName +"')/fields",
        type: "GET",
        async: true,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            //console.log(data.d.results);
            dfd.resolve( data.d.results );//resolve(data.d.results);
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            dfd.reject( error );//reject(error);
        }
    });  
    
  return dfd.promise();
}

//function to Delete list item
function deleteItem(listName,itemIDArray, oldItem) {
	var Dfd = $.Deferred(); 
	var modelsDeleted=0;
	if(itemIDArray.length==0)
	 {
	 	Dfd.resolve(true);
	 }
	 for(var r=0;r<itemIDArray.length;r++)
	{
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('"+listName+"')/getItemById('"+itemIDArray[r]+"')",
		type: "DELETE",
		async:false,
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"If-Match": "*"//oldItem.__metadata.etag
			},
		success: function (data) {
		console.log("Deleted");
		modelsDeleted++;
    	if(modelsDeleted== itemIDArray.length)
			 {
			 	Dfd.resolve(true);
			 }
		},
		error: function (error) {
		alert(JSON.stringify(error));
		Dfd.reject(false);
		}
	});
	}
	return Dfd.promise();
}

//delete attachement
function DeleteItemAttachment(ListName, ItemId, FileTitleArray) {  
    var Dfd = $.Deferred();  
    var successfulFileAttachCount = 0; 
    if(FileTitleArray.length>0)
    {
    	for (var i = 0; i < FileTitleArray.length; i++) 
    	{  
	        var FileTitle = FileTitleArray[i];
		    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+ ListName +"')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')";  
		    $.ajax({  
		        url: Url,  
		        type: 'DELETE',  
		        async: false,
		        contentType: 'application/json;odata=verbose',  
		        headers: {  
		            'X-RequestDigest': $('#__REQUESTDIGEST').val(),  
		            'X-HTTP-Method': 'DELETE',  
		            'Accept': 'application/json;odata=verbose'  
		        },  
		        success: function (data) {  
		            //Dfd.resolve(data);  
		            successfulFileAttachCount++;
		        },  
		        error: function (error) {  
		            Dfd.reject(false);//JSON.stringify(error));  
		        }  
		    });
		 }
		 if(successfulFileAttachCount== FileTitleArray.length)
		 {
		 	Dfd.resolve(true); 
		 } 
    } 
    else
    {
    	Dfd.resolve(true);
    } 
    return Dfd.promise();  
}


//Function to Update List Item
function updateItem(listName, itemID, oldItem, newItem) {
  var dfd = jQuery.Deferred();
 	$.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('"+listName+"')/getItemById('"+itemID+"')",
            type: "PATCH",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": oldItem.__metadata.etag
            },
            data: JSON.stringify(newItem),
            success: function (data) {
                dfd.resolve( true );
            },
            error: function (error) {
            	dfd.reject( false );
                alert(JSON.stringify(error));
            }
        });    
     return dfd.promise();
}

//function to Add List Item
function updateItemsFromArray(listName, oldItem , dataArray) {
var dfd = jQuery.Deferred();
if(dataArray.length==0)
 {
 	dfd.resolve(true);
 } 
var ModelsAdded= 0;
var ModelId;
var deletedFileCollection;
var deletedfileArray;
for(var r=0;r<dataArray.length;r++)
{	
	deletedFileCollection ="";
	ModeldeletedfileArray=[];
	ModelId = (dataArray[r].Title).split('_')[1];
	ItemId = $('#ModuleListItemId_'+ModelId).val();
	if(($('#AttachDel_'+ModelId).val()).match(/##1##/g) != undefined)
	{
		for(var d=0;d<($('#AttachDel_'+ModelId).val()).match(/##1##/g).length;d++)
		{
			ModeldeletedfileArray.push(($('#AttachDel_'+ModelId).val()).split('##1##')[d]);
		}
	}
	//deletedfileArray.pop();
	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/GetByTitle('"+ listName+"')/getItemById('"+ItemId +"')",
        type: "PATCH",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": "*"//oldItem.__metadata.etag
        },
        data: JSON.stringify(dataArray[r]),
        success: function (data) {
        	var filesvar=$("#attachFilesHolderModel_"+ ModelId +" input:file");//var filesvar=$("#attachFilesHolder input:file");
		    var files= filesvar[0].files;
			if(files.length == 0 && DeleteItemAttachment(ModelsListName , ItemId , ModeldeletedfileArray))
			{
            	ModelsAdded++;
            	if(ModelsAdded == dataArray.length)
					 {
					 	dfd.resolve(true);
					 }
            }
            else
            {
            	$.when(AddAttachmentsForModel(ModelsListName , ItemId  , ModelId),DeleteItemAttachment(ModelsListName , ItemId  , ModeldeletedfileArray)).then(function (response) {//AddAttachments(NewInstrumentID);       
            	 ModelsAdded++;  
            	  if(ModelsAdded == dataArray.length)
					 {
					 	dfd.resolve(true);
					 }     
            	 });         	
            }
        },
        error: function (error) {
            dfd.reject(false);
        }
    });
 }
    return dfd.promise();
}


function getItems(listName) {
  var dfd = jQuery.Deferred();
 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl +"/_api/Web/Lists/GetByTitle('"+ listName +"')/Items",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
			dfd.resolve( data.d.results );
		},
        error: function (error) {
            dfd.reject( error );
        }
    });
    
  return dfd.promise();
}

function GetFieldOptions(listname, fieldName) {
            return $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listname+"')/Fields?$filter=EntityPropertyName eq '"+fieldName+"'",
                async:false,
                type: "GET",                
                headers: {
                    "accept": "application/json;odata=verbose",                    
                    "Content-Type": "application/json;odata=verbose"
                }
            })
        }


		function updateChoiceField(listname, fieldName, choicearray) {
			var dfdchoices = jQuery.Deferred();
				GetFieldOptions(listname, fieldName).done(function (data) {
				
            
                var FieldOptions = data.d.results[0].Choices.results;
                FieldOptions.push(choicearray);
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EMSEquipments')/Fields(guid'4a53182f-7d19-42c4-94ce-4f7e0e9cc3a5')",///_api/web/lists/GetByTitle('"+listname+"')/Fields/(guid'"+data.d.results[0].Id+"')",
                    type: "POST",
                    data: JSON.stringify({ "__metadata": { "type": "SP.FieldMultiChoice" }, "Choices": { "__metadata": { "type": "Collection(Edm.String)" }, "results":FieldOptions  } }),

                    headers: {
                        "accept": "application/json;odata=verbose",
                        "X-RequestDigest": $('#__REQUESTDIGEST').val(),
                        "Content-Type": "application/json;odata=verbose",
                        "X-HTTP-Method": "PATCH",
                        "IF-MATCH": "*",
                    },
                    success: function (data) {
                        dfdchoices.resolve( true );
                    },
                    error: function (error) {
                        dfdchoices.reject( false );
                    }              
            	})
			
			})
			return dfdchoices.promise();
        }
        
        
function getItemsByUrl(url) {
  var dfd = jQuery.Deferred();
 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,//"/_api/Web/Lists/GetByTitle('"+ listName +"')/Items",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
        	//console.log(data);
			dfd.resolve( data.d.results);
		},
        error: function (error) {
            dfd.reject( error );
        }
    });
    
  return dfd.promise();
}
var response=[] ;
function getItemsByUrlRecursive(url) {
 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,//"/_api/Web/Lists/GetByTitle('"+ listName +"')/Items",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
        	//console.log(data);
        	//debugger;
	    	response = response.concat(data.d.results);
	            if (data.d.__next) {
	                url = "/_api"+ (data.d.__next).split('/_api')[1];
	                
	                getItemsByUrlRecursive(url);
	            }
		},
        error: function (error) {
            return( error );
        }
    });
   return( response );	           
}
var response2=[] ;
function getItemsByUrlRecursive2(url) {
 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,//"/_api/Web/Lists/GetByTitle('"+ listName +"')/Items",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
        	//console.log(data);
        	//debugger;
	    	response2 = response2.concat(data.d.results);
	            if (data.d.__next) {
	                url = "/_api"+ (data.d.__next).split('/_api')[1];
	                
	                getItemsByUrlRecursive2(url);
	            }
		},
        error: function (error) {
            return( error );
        }
    });
   return( response2 );	           
}
var response3=[] ;
function getItemsByUrlRecursive3(url) {
 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,//"/_api/Web/Lists/GetByTitle('"+ listName +"')/Items",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
        	//console.log(data);
        	//debugger;
	    	response3 = response3.concat(data.d.results);
	            if (data.d.__next) {
	                url = "/_api"+ (data.d.__next).split('/_api')[1];
	                
	                getItemsByUrlRecursive3(url);
	            }
		},
        error: function (error) {
            return( error );
        }
    });
   return( response3 );	           
}




function getItemsByUrlAsync(url) {
  var dfd = jQuery.Deferred();
 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,//"/_api/Web/Lists/GetByTitle('"+ listName +"')/Items",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
        	//console.log(data);
			dfd.resolve( data.d.results);
		},
        error: function (error) {
            dfd.reject( error );
        }
    });
    
  return dfd.promise();
}

//function to Get Filtered List Item
    function getItemsbyFilters(listName, filterText) {
        var dfd = jQuery.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl +"/_api/Web/Lists/GetByTitle('"+ listName +"')/items?"+filterText ,
            type: "GET",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function (data) {
                dfd.resolve( data.d.results);
                //resultData= data.d.results;
            },
            error: function (error) {
                //alert(JSON.stringify(error));
                dfd.reject( error );
            }
        });
       return dfd.promise();;
    }

//function to Add List Item
function addNewItem(listName, data) {
var dfd = jQuery.Deferred();

$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/GetByTitle('"+ listName +"')/items",
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(data),
        success: function (data) {
             dfd.resolve(data);
        },
        error: function (error) {
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

    //function to Get Filtered List Item
    function getFieldsData1(listName) {
        var resultData;
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl +"/_api/Web/Lists/GetByTitle('"+ listName +"')/fields",
            type: "GET",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function (data) {
                console.log(data.d.results);
                resultData= data.d.results;
            },
            error: function (error) {
                alert(JSON.stringify(error));
                return error;
            }
        });
       return resultData;
    }


//function to Add List Item
function addNewItemsFromArray(listName, dataArray) {
var dfd = jQuery.Deferred();
if(dataArray.length==0)
 {
 	dfd.resolve(true);
 } 
var ModelsAdded= 0;
var ModelId;
for(var r=0;r<dataArray.length;r++)
{	
	ModelId = (dataArray[r].Title).split('_')[1];
	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/GetByTitle('"+ listName +"')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(dataArray[r]),
        success: function (data) {
        	var filesvar=$("#attachFilesHolderModel_"+ ModelId +" input:file");//var filesvar=$("#attachFilesHolder input:file");
		    var files= filesvar[0].files;
			if(files.length == 0)
			{
            	ModelsAdded++;
            	if(ModelsAdded == dataArray.length)
					 {
					 	dfd.resolve(true);
					 }
            }
            else
            {
            	$.when(AddAttachmentsForModel(ModelsListName , data.d.Id , ModelId)).then(function (response) {//AddAttachments(NewInstrumentID);       
            	 ModelsAdded++;  
            	  if(ModelsAdded == dataArray.length)
					 {
					 	dfd.resolve(true);
					 }     
            	 });         	
            }
        },
        error: function (error) {
            dfd.reject(false);
        }
    });
 }
    return dfd.promise();
}

    
    fileUploadeCount = 0;
    //Attachment Code Start
    function AddAttachmentsForModel(list_Name, CreatedItemId, ModelId)
 	{
 	var dfdforModel = jQuery.Deferred();
    var arraycount = 0;  
    fileUploadeCount = 0; 
    var listItem = "";  
    var fileArray = [];  
    var filesvar=$("#attachFilesHolderModel_"+ ModelId +" input:file");//$("#attachFilesHolder input:file");
    var files= filesvar[0].files;
    $.each(files, function (key, value) {
    	fileArray.push({ "Attachment": files[key] });
    });

    arraycount = fileArray.length;
    var filearray = fileArray;
    if (fileArray.length != 0) {  
        for (i = 0; i <= filearray.length - 1; i++) {  
			 var listname = list_Name;
            loopFileUpload(listname, CreatedItemId, filearray, i).then(  
                function () { 
                	dfdforModel.resolve(true); 
                },  
                function (sender, args) {  
                	//return false;
                    console.log("Error uploading");  
                    dfdforModel.reject(sender, args);  
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
  
                }, success: onAttachmentSucessModel , error: onAttachmentErrorModel
  
            });  
  
        });  
        function onAttachmentSucessModel() {  
            fileUploadeCount++;  
            if (arraycount == fileUploadeCount) {  
                console.log('MOdels uploaded successfully'); 
                //return true; 
                dfd.resolve(true);//return true; 
                //$('.modal.aa').modal('open');
                //$('#SubmitModalHeader').append('<h4 style="color:green"><i class="material-icons medium">done</i>&nbspInstrument Added successfully!(ID: ' + CreatedItemId+ ')</h4>');
                //$('#SubmitModalHeader').text('Instrument Added successfully!(ID: '+response.d.Id+')');
                //$('#SubmitModalDescription').text('Instrument Added successfully!(ID: '+response.d.Id+')');
            }  
        }
        function onAttachmentErrorModel() {  
        	//console.log(error);
        	//return false;
             dfd.reject(false);//return false;
	        //$('.modal.aa').modal('open');
	        //$('#SubmitModalHeader').append('<h4 style="color:blue"><i class="material-icons medium">error</i>&nbsp Instrument and Model/s Added but attachment upload failed! </br><p style="color:black">Please goto Edit form of item to upload attachment.</p></h4>');
        }
     }
     }


	//Attachment Code End
    
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
	};
   
   

