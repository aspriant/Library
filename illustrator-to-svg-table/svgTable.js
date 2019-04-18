(function() {
    'use strict';
    //var iva = window.iva || {};
    var childSvg;
    function getTable(){
        //var docTableArr =   document.querySelectorAll('[data-table]');
        $( '.popup' ).addClass('includeSvg');
        var docTableArr = $(document).find('[data-table]');
        $.each(docTableArr, function(index, value){
            var tableName = $(value).data('table');
            $(this).append(appendTable(tableName));
            var _clipPath = $(this).children().find('clipPath');
            console.log(index+'  --  '+_clipPath.html());
            _clipPath.remove();
            if(index>=docTableArr.length-1){
               $( '.popup' ).removeClass('includeSvg');
            }
        });
        if(docTableArr.length<=0){
           $( '.popup' ).removeClass('includeSvg');
        }
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