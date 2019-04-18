#target illustrator;

try {
	if (app.documents.length > 0 ) {
		var destFolder = Folder.selectDialog( 'Select folder for SVG files.', '~' );
		if (destFolder != null) {
			var optionsFonts, optionsOutline, i, sourceDoc, targetFile, targetFileTemp;	
			optionsFonts = getOptionsWithFonts(); 			
			for ( i = 0; i < app.documents.length; i++ ) {
				sourceDoc = app.documents[i]; // returns the document object
                targetFileTemp = getTargetFile('temp', '.svg', destFolder);
                 sourceDoc.exportFile(targetFileTemp, ExportType.SVG, optionsFonts);
                
                XML.prettyPrinting = true;
                
                targetFileTemp.open("r");
                targetFileTemp.encoding = "UTF-8";
                targetFileTemp.lineFeed = "Macintosh";
                var myXmlString = targetFileTemp.read();            
                
                
                var graphHtmlFile = new File(destFolder+ "/table.html");          
                graphHtmlFile.encoding = "UTF-8";
                graphHtmlFile.lineFeed = "Macintosh";
                try{        
                   
                    graphHtmlFile.open("w");
                    var outputString = myXmlString;
                    graphHtmlFile.write(outputString);                    
                    
                }
                catch(err){
                    $.writeln("error = "+err);
               }

               graphHtmlFile.close();
               //targetFileTemp.remove();
                
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
function getOptionsWithFonts()
{
    var exportOptions = new ExportOptionsSVG();
    exportOptions.fontSubsetting = SVGFontSubsetting.None;
    exportOptions.documentEncoding = SVGDocumentEncoding.UTF8;
    exportOptions.DTD = SVGDTDVersion.SVG1_1;	
	return exportOptions;
}
function getTargetFile(docName, ext, destFolder) {
	var newName = "";
	if (docName.indexOf('.') < 0) {
		newName = docName + ext;
	} else {
		var dot = docName.lastIndexOf('.');
		newName += docName.substring(0, dot);
		newName += ext;
	}	
	var myFile = new File( destFolder + '/' + newName );
	
	if (myFile.open("w")) {
		myFile.close();
	}
	else {
		throw new Error('Access is denied');
	}
	return myFile;
}