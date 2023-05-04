<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Exception;
use PhpOffice\PhpSpreadsheet\Writer\Xls;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\Attribute;
use App\Models\Port;
use App\Models\Service;
use App\Models\Shipment;
use App\Models\SlotDetail;

class ExcelController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    function index()
    {
        $data = DB::table('users')->orderBy('id', 'DESC')->paginate(5);
        return view('welcome', compact('data'));
    }
    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    function importData(Request $request)
    {
        $this->validate($request, [
            'uploaded_file' => 'required|file|mimes:xls,xlsx'
        ]);
        $the_file = $request->file('uploaded_file');
        try {
            $spreadsheet = IOFactory::load($the_file->getRealPath());
            $sheet        = $spreadsheet->getActiveSheet();
            $row_limit    = $sheet->getHighestDataRow();
            $column_limit = $sheet->getHighestDataColumn();
            $row_range    = range(3, $row_limit);
            $column_range = range('F', $column_limit);
            $startcount = 3;
            $data = array();
            foreach ($row_range as $row) {
                $data[] = [
                    'slot_operator' => $sheet->getCell('A' . $row)->getValue(),
                    'service_name' => $sheet->getCell('B' . $row)->getValue(),
                    'pol' => $sheet->getCell('C' . $row)->getValue(),
                    'pod' => $sheet->getCell('D' . $row)->getValue(),
                    'terminal' => $sheet->getCell('E' . $row)->getValue(),
                    'volume_per_teu' => $sheet->getCell('F' . $row)->getValue(),
                    'TS_Or_Direct' => $sheet->getCell('G' . $row)->getValue(),
                    'Slot_Term' => $sheet->getCell('H' . $row)->getValue(),
                    'LDN_20ft' => $sheet->getCell('I' . $row)->getValue(),
                    'LDN_40HC' => $sheet->getCell('J' . $row)->getValue(),
                    'LDN_EWRI_TEU' => $sheet->getCell('k' . $row)->getValue(),
                    'LDN_BAF_TEU' => $sheet->getCell('L' . $row)->getValue(),
                    'ECR_PER_TEU' => $sheet->getCell('M' . $row)->getValue(),
                    'Flexi_Sur_TEU' => $sheet->getCell('N' . $row)->getValue(),
                    'DG_Sur_20FT' => $sheet->getCell('O' . $row)->getValue(),
                    'DG_Sur_40FT' => $sheet->getCell('P' . $row)->getValue(),
                    'DG_CLASS_1_PER_TEU' => $sheet->getCell('Q' . $row)->getValue(),
                    'REEFER_SUR' => $sheet->getCell('R' . $row)->getValue(),
                    'DTHC_NON_HAZ_20FT' => $sheet->getCell('S' . $row)->getValue(),
                    'DTHC_NON_HAZ_40FT' => $sheet->getCell('T' . $row)->getValue(),
                    'DTHC_HAZ_20FT' => $sheet->getCell('U' . $row)->getValue(),
                    'TANK_SCHARGE_TUE' => $sheet->getCell('W' . $row)->getValue(),
                    'GRI_TUE' => $sheet->getCell('X' . $row)->getValue(),
                    'ROB_FEE_TUE' => $sheet->getCell('Y' . $row)->getValue(),
                    'MT_20ft' => $sheet->getCell('Z' . $row)->getValue(),
                    'MT_40HC' => $sheet->getCell('AA' . $row)->getValue(),
                    'MT_EWRI_TEU' => $sheet->getCell('AB' . $row)->getValue(),
                    'MT_BAF_TEU' => $sheet->getCell('AC' . $row)->getValue(),
                    'MT_TANK_SCHARGE' => $sheet->getCell('AD' . $row)->getValue(),
                    'EFFECTIVE_DATE' => $sheet->getCell('AE' . $row)->getValue(),
                    'VALIDTY' => $sheet->getCell('AF' . $row)->getValue(),
                    'REMARKS' => $sheet->getCell('AG' . $row)->getValue(),
                ];
                $startcount++;
            }
            $firstItem = $data[0];


            foreach ($data as $item) {
                if (is_string($item['LDN_20ft']) && preg_match('/^=.*$/', $item['LDN_20ft'])) {
                    $expression = preg_replace('/[^0-9+\-*\/]/', '', $item['LDN_20ft']);
                    $result = eval("return $expression;");
                    $item['LDN_20ft'] =  $result;
                }
                if (is_string($item['LDN_40HC']) && preg_match('/^=.*$/', $item['LDN_40HC'])) {
                    $expression = preg_replace('/[^0-9+\-*\/]/', '', $item['LDN_40HC']);
                    $result = eval("return $expression;");
                    $item['LDN_40HC'] =  $result;
                }
                if (is_string($item['LDN_EWRI_TEU']) && (strpos($item['LDN_EWRI_TEU'], 'Nill') !== false || strpos($item['LDN_EWRI_TEU'], 'INCL') !== false)) {
                    $item['LDN_EWRI_TEU'] = null;
                }
                if (is_string($item['LDN_BAF_TEU']) && (strpos($item['LDN_EWRI_TEU'], 'Nill') !== false || strpos($item['LDN_EWRI_TEU'], 'INCL') !== false)) {
                    $item['LDN_BAF_TEU'] = null;
                }
                if (is_string($item['DG_Sur_40FT']) && preg_match('/^=.*$/', $item['DG_Sur_40FT'])) {
                    $expression = str_replace('O', '', $item['DG_Sur_40FT']); // remove 'O' from expression
                    $expression = preg_replace('/[^0-9+\-*\/]/', '', $expression);
                    $result = eval("return $expression;");
                    $item['LDN_40HC'] =  $result;
                }
                if (is_string($item['REEFER_SUR'])) {
                    $item['REEFER_SUR'] = preg_replace('/\/(U|PLG)?/', '', $item['REEFER_SUR']);
                }
                if (is_string($item['MT_40HC']) && preg_match('/^=.*$/', $item['MT_40HC'])) {
                    $expression = str_replace('Z', '', $item['MT_40HC']); // remove 'O' from expression
                    $expression = preg_replace('/[^0-9+\-*\/]/', '', $expression);
                    $result = eval("return $expression;");
                    $item['MT_40HC'] =  $result;
                }
                if (is_string($item['MT_BAF_TEU']) && (strpos($item['MT_BAF_TEU'], 'Nill') !== false || strpos($item['MT_BAF_TEU'], 'INCL') !== false)) {
                    $item['MT_BAF_TEU'] = null;
                }


                $attribute = Attribute::create([
                    'LDN_20ft' => $item['LDN_20ft'],
                    'LDN_40HC' => $item['LDN_40HC'],
                    'LDN_EWRI_TEU' => $item['LDN_EWRI_TEU'],
                    'LDN_BAF_TEU' => $item['LDN_BAF_TEU'],
                    'ECR_PER_TEU' => $item['ECR_PER_TEU'],
                    'Flexi_Sur_TEU' => $item['Flexi_Sur_TEU'],
                    'DG_Sur_20FT' => $item['DG_Sur_20FT'],
                    'DG_Sur_40FT' => $item['DG_Sur_40FT'],
                    'DG_CLASS_1_PER_TEU' => $item['DG_CLASS_1_PER_TEU'],
                    'REEFER_SUR' => $item['REEFER_SUR'],
                    'DTHC_NON_HAZ_20FT' => $item['DTHC_NON_HAZ_20FT'],
                    'DTHC_HAZ_20FT' => $item['DTHC_HAZ_20FT'],
                    'DTHC_NON_HAZ_40FT' => $item['DTHC_NON_HAZ_40FT'],
                    'TANK_S_CHARGE_TUE' => $item['TANK_SCHARGE_TUE'],
                    'GRI_TUE' => $item['GRI_TUE'],
                    'ROB_FEE_TUE' => $item['ROB_FEE_TUE'],
                    'MT_20ft' => $item['MT_20ft'],
                    'MT_40HC' => $item['MT_40HC'],
                    'MT_EWRI_TEU' => $item['MT_EWRI_TEU'],
                    'MT_BAF_TEU' => $item['MT_BAF_TEU'],
                    'MT_TANK_S_CHARGE' => $item['MT_TANK_SCHARGE'],
                    'EFFECTIVE_DATE' => $item['EFFECTIVE_DATE'],
                    'VALIDITY' => $item['VALIDTY'],
                    'REMARKS' => $item['REMARKS'],
                    'datetime' => '2023-05-02 07:13:25',
                ]);
           
                $service = Service::create([
                    'slot_op_name' => $item['slot_operator'],
                    'service_name' => $item['service_name'],
                    'identifier' => '1',
                ]);
                $shipmentDetail = Shipment::create([
                    'port_id' => '1',
                    'pod' => $item['pod'],
                    'pol' => $item['pol'],
                    'terminal' => $item['terminal'],
                    'volume_per_teu' => $item['volume_per_teu'],
                    'T_S_or_diect' => $item['TS_Or_Direct'],
                    'Slot_term' => $item['Slot_Term'],
                    'service_id' => $service->id,
                    'attribute_id' => $attribute->id
                ]);
              
                
                // extra
                $port = Port::create([
                    'name' => $item['pol'],
                    'identifier' => $service->id,
                ]);
                $slotDetail = SlotDetail::create([
                    'attribute_id' => $service->id,
                    'value' => $service->id,
                    'shipment_id' => $service->id,
                ]);
            }
            dd($attribute);
            return;
        } catch (Exception $e) {
            $error_code = $e->errorInfo[1];
            return back()->withErrors('There was a problem uploading the data!');
        }
        return back()->withSuccess('Great! Data has been successfully uploaded.');
    }
    /**
     * @param $customer_data
     */
    public function ExportExcel($customer_data)
    {
        ini_set('max_execution_time', 0);
        ini_set('memory_limit', '4000M');
        try {
            $spreadSheet = new Spreadsheet();
            $spreadSheet->getActiveSheet()->getDefaultColumnDimension()->setWidth(20);
            $spreadSheet->getActiveSheet()->fromArray($customer_data);
            $Excel_writer = new Xls($spreadSheet);
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="Customer_ExportedData.xls"');
            header('Cache-Control: max-age=0');
            ob_end_clean();
            $Excel_writer->save('php://output');
            exit();
        } catch (Exception $e) {
            return;
        }
    }
    /**
     *This function loads the customer data from the database then converts it
     * into an Array that will be exported to Excel
     */
    function exportData()
    {
        $data = DB::table('tbl_customer')->orderBy('CustomerID', 'DESC')->get();
        $data_array[] = array("CustomerName", "Gender", "Address", "City", "PostalCode", "Country");
        foreach ($data as $data_item) {
            $data_array[] = array(
                'CustomerName' => $data_item->CustomerName,
                'Gender' => $data_item->Gender,
                'Address' => $data_item->Address,
                'City' => $data_item->City,
                'PostalCode' => $data_item->PostalCode,
                'Country' => $data_item->Country
            );
        }
        $this->ExportExcel($data_array);
    }
}
