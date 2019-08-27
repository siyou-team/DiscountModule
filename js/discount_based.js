$(function() {
    var $grid = $("#grid");
    var $form = $("#manage-form");
    var $handle = $.extend(handle, {

        //操作项格式化，适用于有“修改、删除”操作的表格
        operFormatter: function(val, opt, row) {
            var text = row.product_state_id == StateCode.PRODUCT_STATE_ILLEGAL ? __('删除') : __('违规下架');
            var cls = row.product_state_id == StateCode.PRODUCT_STATE_ILLEGAL ? 'ui-icon-trash' : 'ui-icon-circle-arrow-s';

            var verify_str = row.product_verify_id != StateCode.PRODUCT_VERIFY_WAITING ? 'ui-icon-disabled' : '';
            var close_str = row.product_state_id != StateCode.PRODUCT_VERIFY_WAITING ? 'ui-icon-disabled' : '';

            var html_con = '<div class="operating" data-id="' + row.id + '"><span class="ui-icon ui-icon-info" title="' + __('查看商品详情') + '"></span><span class="ui-icon ui-icon-cart" title="查看商品SKU详情"></span><span class="ui-icon ' + cls + '" title="' + text + '"></span><span class="ui-icon ui-icon-search ' + verify_str + '" title="审核"></span></div>' ;

            return html_con;
        },

        stateFormatter: function(val, opt, row) {
            var text, cls;

            if (val == 10)
            {
                text = __('违规下架');
                cls = 'ui-label-default';
            }
            else if (val == 1)
            {
                text = __('正常');
                cls = 'ui-label-success';
            }
            else
            {
                text = __('卖家下架');
                cls = 'ui-label-default';
            }

            return '<span class="set-status ui-label ' + cls + '" data-enable="' + val + '" data-id="' + row.id + '">' + text + '</span>';
        },
        imageFormatter: function (val, opt, row)
        {
            if (row.product_image)
            {
                val = '<img src="' + row.product_image + '">';
            }
            else
            {
                val = '&#160;';
            }
            return val;
        },
        verifyFormatter: function (val, opt, row)
        {
            var text, cls;

            if (val == 10)
            {
                text = __('待审核');
                cls = 'ui-label-default';
            }
            else if (val == 1)
            {
                text = __('通过');
                cls = 'ui-label-success';
            }
            else
            {
                text = __('未通过');
                cls = 'ui-label-default';
            }

            return '<span class="set-status ui-label ' + cls + '" data-enable="' + val + '" data-id="' + row.id + '">' + text + '</span>';

            return val;
        },

        initDom: function() {

            var defaultPage = Public.getDefaultPage();
            defaultPage.SYSTEM = defaultPage.SYSTEM || {};
            defaultPage.SYSTEM.categoryInfo = defaultPage.SYSTEM.categoryInfo || {};
            stateCombo = Business.categoryCombo($('#product_state_id'), {
                editable: false,
                extraListHtml: '',
                addOptions: {
                    value: -1,
                    text: __('选择产品状态')
                },
                defaultSelected: 0,
                trigger: true,
                width: 120
            }, 'product_state_id');


            verifyCombo = Business.categoryCombo($('#product_verify_id'), {
                editable: false,
                extraListHtml: '',
                addOptions: {
                    value: -1,
                    text: __('选择审核状态')
                },
                defaultSelected: 0,
                trigger: true,
                width: 120
            }, 'product_verify_id');

            stateCombo.selectByValue(product_state_id);
            verifyCombo.selectByValue(product_verify_id);


            //商品类别
            var opts = {
                url: SYS.CONFIG.index_url + '?ctl=Base_ProductCategory&met=tree&typ=json',
                width : 300,
                selectOnlyLeaf : false,

                //inputWidth : (SYSTEM.enableStorage ? 145 : 208),
                inputWidth :  300,
                //defaultSelectValue : '-1',
                //defaultSelectValue :, rowData.categoryId || '',
            }

            var categoryTree = Public.categoryTree($('#category_id'), opts, 'product_category');
            return this;
        },

        initField: function(rowData) {
            if (rowData.id) {
                $('#product_id').val(rowData.product_id);
                $('#product_name').val(rowData.product_name);
                $('#product_tips').val(rowData.product_tips);
                $('#store_id').val(rowData.store_id);
                $('#store_name').val(rowData.store_name);
                $('#product_market_price').val(rowData.product_market_price);
                $('#product_unit_price').val(rowData.product_unit_price);
                $('#product_cost_price').val(rowData.product_cost_price);
                $('#discount_type').val(rowData.discount_type);
                $('#discount_value1').val(rowData.discount_value1);
                $('#discount_value2').val(rowData.discount_value2);
                $('#startdate').val(rowData.startdate);
                $('#expiredate').val(rowData.expiredate);
                $('#update_time').val(rowData.update_time);

                //$('#' + this.$priKey).attr("readonly", "readonly");
                //$('#' + this.$priKey).addClass('ui-input-dis');
                this.initState();
            }

            return this;
        },

        resetForm: function(t) {
            $('#product_id').val('');
            $('#product_name').val('');
            $('#product_tips').val('');
            $('#store_id').val('');
            $('#store_name').val('');
            $('#product_market_price').val('');
            $('#product_unit_price').val('');
            $('#product_cost_price').val('');
            $('#discount_type').val(rowData.discount_type);
            $('#discount_value1').val(rowData.discount_value1);
            $('#discount_value2').val(rowData.discount_value2);
            $('#startdate').val(rowData.startdate);
            $('#expiredate').val(rowData.expiredate);
            $('#update_time').val(rowData.update_time);

            this.initState();

            return this;
        }
    });

    var $col_model = [ {
        "name": "product_id",
        "index": "product_id",
        "label": __("产品SPU"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "width": 100
    }, {
        "name": "product_name",
        "index": "product_name",
        "label": __("产品名称"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "width": 100
    }, {
        "name": "item_barcode",
        "index": "item_barcode",
        "label": "item_barcode",
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "width": 100
    }, {
        "name": "product_tips",
        "index": "product_tips",
        "label": __("商品卖点"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "width": 100
    }, {
        "name": "store_id",
        "index": "store_id",
        "label": __("店铺编号"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "store_name",
        "index": "store_name",
        "label": __("店铺名称"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "width": 100
    }, {
        "name": "product_market_price",
        "index": "product_market_price",
        "label": __("市场价"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "product_unit_price",
        "index": "product_unit_price",
        "label": __("商品单价"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "product_cost_price",
        "index": "product_cost_price",
        "label": __("成本价"),
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "discount_type",
        "index": "discount_type",
        "label": "discount_type",
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "discount_value1",
        "index": "discount_value1",
        "label": "discount_value1",
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "discount_value2",
        "index": "discount_value2",
        "label": "discount_value2",
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "starttime",
        "index": "starttime",
        "label": "starttime",
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }, {
        "name": "expiredate",
        "index": "expiredate",
        "label": "expiredate",
        "classes": "ui-ellipsis",
        "align": "center",
        "title": false,
        "fixed": true,
        "width": 100
    }];

    $handle.init($grid, $form, 'product_id', 'Product_Base', '');

    var $opt = {
        autowidth: true,
        shrinkToFit: false,
        forceFit: false,
        multiselect: true,
        onSelectRow:function(rowid, status){
            if(status){
                var rowData = $grid.jqGrid('getRowData', rowid);


                selectList[rowid] = rowid;
            }else if(selectList[rowid]){
                delete selectList[rowid];
            }
            //alert(selectList);
            console.log(selectList);
        },
        onSelectAll:function(aRowids, status){
            for ( var i = 0, len = aRowids.length; i < len; i++){
                var rowid = aRowids[i];
                //var unitInfo = $('#' + rowid).data("unitInfo");
                if(status){
                    var rowData = $grid.jqGrid('getRowData', rowid);
                    /*                        rowData.unitId = unitInfo.unitId;
                                            rowData.unitName = unitInfo.name;*/
                    selectList[rowid] = rowid;
                }else if(selectList[rowid]){
                    delete selectList[rowid];
                }
            }
            console.log(selectList);

        },
    };

    if ($grid.length > 0) {
        $handle.initDom().initGrid($col_model, $opt).initGridEvent();
    }

    //manage
    if (frameElement && frameElement.api) {
        //var curRow, curCol, curArrears;
        var api = frameElement.api;

        $handle.initPopBtns(api, {
            fields: {},
        });

        $handle.initField(api.data.rowData || {}).initState();
    }
    $( "#update" ).click(function() {
        $.ajax({
            url: SYS.CONFIG.index_url + '?ctl=Discountshop_Type&met=discount&typ=json',
            data: "ids="+JSON.stringify(selectList).toString()+"&discount_type="+$('#discount_type').val()+"&discount_value1="+$('#discount_value1').val()+"&discount_value2="+$('#discount_value2').val()
                +"&start_time="+$('#start_time').val()+"&expire_time="+$('#expire_time').val(),
            type: 'POST',
            success: function (resp) {
                alert(resp);
                var jsonp = JSON.parse(resp);
                alert(jsonp.msg);
            },
            error: function(e) {
                alert('Error: '+e.toString());
            }
        });
    });
});
