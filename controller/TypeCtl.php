<?php if (!defined('ROOT_PATH')) exit('No Permission');
/**
 * @author     amin
 */
class Discountshop_TypeCtl extends AdminController
{

    public function index()
    {
		$this->render('default');
    }
    /**
     * 管理界面
     *
     * @access public
     */
    public function manage()
    {
        $this->render('manage');
    }

    /**
     * 首页
     *
     * @access public
     */
    public function filter()
    {
        $this->render('default');
    }

    /**
     * 管理界面
     *
     * @access public
     */
    public function closeManage()
    {
        $this->render('manage');
    }

    /**
     * 管理界面
     *
     * @access public
     */
    public function verifyManage()
    {
        $this->render('manage');
    }
    public function details()
    {
        $this->render('manage');
    }
    public function discount(){
        $item_ids = json_decode($_POST['ids']);
        $discount_type = $_POST['discount_type'];
        $value1 = $_POST['discount_value1'];
        $value2 = $_POST['discount_value2'];
        $start_str = $_POST['start_time'];
        $expire_str = $_POST['expire_time'];
        $start_d = DateTime::createFromFormat('Y-m-d', $start_str)->getTimestamp();
        $expire_d = DateTime::createFromFormat('Y-m-d', $expire_str)->getTimestamp();



        $current_time = date('Y-m-d H:i:s');
        $productItemModel=Product_ItemModel::getInstance();
        $productItemModel->sql->startTransactionDb();
        try{
            $flag = array();
            foreach ($item_ids as $k=>$id){
                $item['discount_type']       = $discount_type;
                $item['discount_value1']       = $value1;
                $item['discount_value2']       = $value2;
                $item['startdate']       = $start_d;
                $item['expiredate']       = $expire_d;
                $item['update_time'] = $current_time;
                $flag[]=$productItemModel->edit($id,$item);
            }
            if(is_ok($flag) && $productItemModel->sql->commitDb()) {
                $msg = "Successfully submitted";
                $status = 200;
            }
            else{
                $productItemModel->sql->rollBackDb();
                $msg = "Submit failed";
                $status = 230;
            }
        }catch (Exception $e){
            $productItemModel->sql->rollBackDb();
            $msg = "Submit failed";
            $status = 260;
        }

        $data = array();
        $this->render('default', $data, $msg, $status);
    }
}
?>