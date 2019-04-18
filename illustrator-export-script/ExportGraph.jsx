/**********************************************************

SVG Graph Exporter

*********************************************************/


// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

#target illustrator;

try {
	if (app.documents.length > 0 ) {

		// Get the folder to save the files into
		var destFolder = null;
		destFolder = Folder.selectDialog( 'Select folder for SVG files.', '~' );

		if (destFolder != null) {
			var optionsFonts, optionsOutline, i, sourceDoc, targetFile, targetFileTemp;	
			
    		// Get the SVG options to be used.
			optionsFonts = getOptionsWithFonts();
			optionsOutline = getOptionsWithOutlines();
    		// You can tune these by changing the code in the getOptions() function.
	    			
			for ( i = 0; i < app.documents.length; i++ ) {
				sourceDoc = app.documents[i]; // returns the document object
										
				// Get the file to save the document as svg into
				targetFile = getTargetFile(sourceDoc.name, '.svg', destFolder);
                 targetFileTemp = getTargetFile('temp', '.svg', destFolder);
				
				// Save as SVG
                 sourceDoc.exportFile(targetFileTemp, ExportType.SVG, optionsFonts);
				sourceDoc.exportFile(targetFile, ExportType.SVG, optionsOutline);
				
				// Note: the doc.exportFile function for SVG is actually a Save As
				// operation rather than an Export, that is, the document's name
				// in Illustrator will change to the result of this call.
				

                XML.prettyPrinting = true;
                
                targetFileTemp.open("r");
                targetFileTemp.encoding = "UTF-8";
                targetFileTemp.lineFeed = "Macintosh";
                var myXmlString = targetFileTemp.read();            
                var svgXml = new XML(myXmlString);
                
                var grid, graph, textCopy;
                
                var svgViewBox = svgXml.@viewBox;
                
                for(var i=0; i<svgXml.elements().length(); i++){  
                    //$.writeln(svgXml.elements()[i].@id.toString());
                    if(svgXml.elements()[i].@id.toString() == 'Grid'){
                        grid = svgXml.elements()[i];
                        
                    }else if(svgXml.elements()[i].@id.toString() == 'Graph'){                            
                        graph = svgXml.elements()[i];
                        
                    }else if(svgXml.elements()[i].@id.toString() == 'TextCopy'){
                        textCopy = svgXml.elements()[i];                        
                    }                        
                }
                
                if(grid == undefined) throw new Error('"Grid" layer not found');                   
                if(graph == undefined) throw new Error('"Graph" layer not found');                   
                if(textCopy == undefined)throw new Error('"TextCopy" layer not found');
                    
            
                
                delete grid.@id;
                delete graph.@id;
                delete textCopy.@id;
                
                var dot = sourceDoc.name.lastIndexOf('.');
                var htmlName = sourceDoc.name.substring(0, dot);
		
                
                var graphHtmlFile = new File(destFolder+ "/" + htmlName +".html");          
                graphHtmlFile.encoding = "UTF-8";
                graphHtmlFile.lineFeed = "Macintosh";
                
                try{        
                   
                    graphHtmlFile.open("w");
                    var outputString = '<svg class="graph-grid" viewBox="'+svgViewBox+'">\n' + grid.toXMLString() + '\n</svg>\n' +
                                        '<svg id="'+htmlName+'" class="graph-line" viewBox="'+svgViewBox+'">\n' + graph.toXMLString() + '\n</svg>\n' +
                                        '<svg class="graph-textCopy" viewBox="'+svgViewBox+'">\n' + textCopy.toXMLString() + '\n</svg>';

                    outputString  = outputString.replace(/(points=")([\s]*)([\d]*)/g, "$1$3");                 
                    
                    graphHtmlFile.write(outputString);                    
                    
                }
                catch(err){
                    $.writeln("error = "+err);
               }

               graphHtmlFile.close();
               targetFileTemp.remove();
              
                
			}
			alert( 'Documents saved as HTML/SVG' );
		}
	}
	else{
		throw new Error('There are no documents open!');
	}
}
catch(e) {
	alert( e.message, "Script Alert", true);
}


/** Returns the options to be used for the generated files.
	@return ExportOptionsSVG object
*/
function getOptionsWithFonts()
{
    var exportOptions = new ExportOptionsSVG();
    exportOptions.fontSubsetting = SVGFontSubsetting.None;
    exportOptions.documentEncoding = SVGDocumentEncoding.UTF8;
    exportOptions.DTD = SVGDTDVersion.SVG1_1;	
	return exportOptions;
}

function getOptionsWithOutlines()
{
    var exportOptions = new ExportOptionsSVG();
    exportOptions.fontType = SVGFontType.OUTLINEFONT;
    exportOptions.documentEncoding = SVGDocumentEncoding.UTF8;
    exportOptions.DTD = SVGDTDVersion.SVG1_1;	
	return exportOptions;
}

/** Returns the file to save or export the document into.
	@param docName the name of the document
	@param ext the extension the file extension to be applied
	@param destFolder the output folder
	@return File object
*/
function getTargetFile(docName, ext, destFolder) {
	var newName = "";

	// if name has no dot (and hence no extension),
	// just append the extension
	if (docName.indexOf('.') < 0) {
		newName = docName + ext;
	} else {
		var dot = docName.lastIndexOf('.');
		newName += docName.substring(0, dot);
		newName += ext;
	}
	
	// Create the file object to save to
	var myFile = new File( destFolder + '/' + newName );
	
	// Preflight access rights
	if (myFile.open("w")) {
		myFile.close();
	}
	else {
		throw new Error('Access is denied');
	}
	return myFile;
}


