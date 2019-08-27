<?php if (!defined('ROOT_PATH')) exit('No Permission');?>
<link rel="stylesheet" href="<?=$this->css('plugins/zTree/css/zTreeStyle/zTreeStyle', true)?>">
<script src="<?=$this->js('plugins/zTree/js/jquery.ztree.all-3.5', true)?>"></script>
<style>.showElement {
        display: unset;
    }
    .hideElement {
        display: none;
    }
    .highlight {
        color: #333 !important;
        animation-name: highlight;
        animation-duration: 1.5s;
        animation-iteration-count: 1;
    }

    .selected {
        background: #acbad4;
    }

    @keyframes highlight {
        0% {color: #333;}
        50% {color: #00CC00;}
        100% {color: #333;}
    }
</style>
<div class="page-container"><!-- add class "sidebar-collapsed" to close sidebar by default, "chat-visible" to make chat appear always -->
    <div class="main-content" style="padding-top: 10px;">
        <div class="row">
            <form class="form-inline title-form" id="grid-search-form">
                <div class="col-sm-12">
                    <span id="user"></span>

                    <input type="text" id="product_name" name="product_name" class="ui-input form-control ui-input-ph" placeholder="<?=__('输入商品名称')?>"   autocomplete="off" style="width: 150px;" >
                    <input type="text" id="product_id" name="product_id" class="ui-input form-control ui-input-ph" placeholder="<?=__('输入商品平台货号')?>"   autocomplete="off" style="width: 150px;"  >
                    <input type="text" id="store_name" name="store_name" class="ui-input form-control ui-input-ph" placeholder="<?=__('输入商品所属店铺名称')?>"   autocomplete="off" style="width: 150px;"  >

                    <span width="50px;" style="position: relative;"><input type="text" class="ui-input form-control" id="brand_id"  name="brand_id" autocomplete="off" placeholder="<?=__('输入品牌名称')?>" ><span class="ui-icon-ellipsis"></span></span>
                    <span id="product_state_id"></span>
                    <span id="product_verify_id"></span>
                    <span ><span id="category_id"></span></span>

                    <a class="btn btn-default btn-single" data-color="blue" data-style="slide-left" id="search"><i class="fa fa-search" aria-hidden="true"></i> <?=__('查询')?></a>


                    <div class="btn-group  pull-right">
                        <a class="btn btn-default btn-single" id="btn-refresh"><i class="fa fa-refresh" aria-hidden="true"></i> <?=__('刷新')?></a><a class="btn btn-default btn-single" data-toggle="chat"><i class="fa-question"></i></a>
                    </div>
                </div>
            </form>
        </div>

        <div class="wrapper">
            <div class="grid-wrap">
                <table id="grid"></table>
                <div id="grid-pager"></div>
            </div>
        </div>
        <div class="col-md-12 ">
            <h3 class="text-center">Discount</h3>

            <div class="form-group">
                <label for="discount_type">Discount Type</label>
                <select name="discount_type" id="discount_type" class="form-control">
                    <option value="">--Discount Type--</option>
                    <option value="discount">Discount Amount</option>
                    <option value="percentage">Percentage</option>
                    <option value="BuyNM">Buy N and M for Free</option>
                </select>
                </br>
                <section class="inputContainer">
                    <input id="discount_value1" name="discount_value1" class="form-control" type="text" placeholder="Value 1">
                    <input id="discount_value2" name="discount_value2" class="hideElement form-control" type="text" placeholder="Value 2">
                </section>
            </div>

            <div class="form-group">
                <label for="startDate">Start Date</label>
                <input type="date" name="start_time" id="start_time" placeholder="Start Date" class="form-control">
            </div>
            <div class="form-group">
                <label for="startDate">Expire Date</label>
                <input type="date" name="expire_time" id="expire_time" placeholder="Expire Date" class="form-control">
            </div>
            <div class="form-group">
                <button class="btn btn-info" id="update">Save</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var product_state_id = <?=request_int('product_state_id', -1)?>;
    var product_verify_id = <?=request_int('product_verify_id', -1)?>;
</script>
<script src="<?=$this->js('controllers/discountshop/discount_based')?>"></script>
<script>
    $(document).ready(function() {
        const element = document.getElementById('discount_type');
        const discount_value1 = document.getElementById('discount_value1');
        const discount_value2 = document.getElementById('discount_value2');

        element.addEventListener('change', function(event) {
            switch(event.target.value) {
                case 'discount':
                    discount_value2.classList.remove('showElement');
                    discount_value2.classList.add('hideElement');

                    discount_value1.classList.add('showElement');
                    discount_value1.classList.remove('hideElement');
                    break;
                case 'percentage':
                    discount_value2.classList.remove('showElement');
                    discount_value2.classList.add('hideElement');

                    discount_value1.classList.add('showElement');
                    discount_value1.classList.remove('hideElement');
                    break;
                case 'BuyNM':
                    discount_value1.classList.add('showElement');
                    discount_value2.classList.add('showElement');
                    discount_value1.classList.remove('hideElement');
                    discount_value2.classList.remove('hideElement');
                    break;
            }

            console.log(event.target.value);
        });});

</script>