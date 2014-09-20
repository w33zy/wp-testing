<?php

/**
 * @method int getValue() getValue() Gets the current value for score
 */
class WpTesting_Model_Score extends WpTesting_Model_AbstractModel
{

    protected $columnAliases = array(
        'value' => 'score_value',
    );

    public function getValueWithoutZeros()
    {
        $value = $this->getValue();
        return empty($value) ? '' : $value;
    }

}
