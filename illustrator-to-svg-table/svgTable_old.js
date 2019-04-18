(function() {
    'use strict';
    //var iva = window.iva || {};
    var childSvg;
    function getTable(){
        //var docTableArr =   document.querySelectorAll('[data-table]');
        var docTableArr = $(document).find('[data-table]');
        $.each(docTableArr, function(index, value){
            var tableName = $(value).data('table');
            //console.log(tableName);
            $(this).append(appendTable(tableName));
        });
    }
    function appendTable(tableName){
         $('span').each(function() {
            if($(this).hasClass('build-include') && ($(this).attr('id').indexOf(tableName)>-1)){
                childSvg = $(this).children().detach();
                childSvg.css({'position':'relative'});
            }
        });
        return childSvg;
    }
    getTable();
})();