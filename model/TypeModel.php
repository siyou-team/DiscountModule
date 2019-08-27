<?php if (!defined('ROOT_PATH')) exit('No Permission');


class Discountshop_TypeModel extends Zero_Model
{
	public $_cacheName       = 'typed';
	public $_tableName       = 'discount_type';
	public $_tablePrimaryKey = 'id';
	public $_useCache        = false;

	/**
	 *  默认key = $this->_tableName . '_cond'
	 * @access public
	 */
	public $_multiCond = array(
		'discount_type_cond'=>array(
			
		)
	);

	public function __construct(&$db_id='shop_admin', &$user=null)//shop_admin
	{
		$this->_useCache  = false;
        
        $this->_tabelPrefix  = TABLE_SHOP_DATA_PREFIX;//TABLE_PREFIX;//TABLE_SHOP_DATA_PREFIX;
		parent::__construct($db_id, $user);
	}


	public function getLists($column_row=array(), $sort=array(), $page=1, $rows=500)
	{
		//修改值 $column_row
		$data = $this->lists($column_row, $sort, $page, $rows);

		return $data;
	}
}
?>
