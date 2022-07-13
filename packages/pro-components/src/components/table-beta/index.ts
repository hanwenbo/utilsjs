import AddModal from "./add-modal"
import EditModal from "./edit-modal"
import DelModal from "./del-modal"
import ImportModal from "./import-modal"
import {tableSearch} from "./export-modal"
import TableBeta from "./table-beta";
import DetailModel from "./detail-modal"
import {getRequestParams} from "../../utils/get-request-params"
import {filterDefaultRender} from "../../utils/filter-default-render"
import {getTableListColumns} from "../../utils/get-table-list-columns"
import {TableList} from "./table-list";

export default TableBeta;

export {
  getTableListColumns,
  getRequestParams,
  filterDefaultRender,
  tableSearch,
  AddModal,
  EditModal,
  DelModal,
  ImportModal,
  DetailModel,
  TableList
}
