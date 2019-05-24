var Api = require('./Abstractions/Api');
var OperationResult = require('./Abstractions/OperationResult');

class RelationalTableRows {
  
  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   * @param {string} $tableName name of the table to act against for
   */
  constructor(accountId, authToken, tableName) {
    this.auth_token = authToken;
    this.accountId = accountId;
    this.resource = tableName;

    this.api = new Api(this.accountId, this.auth_token, this.resource);
  }
  
  /**
   * Gets the records of the Relational Table
   * @return OperationResult
   */
  getOrder() {
    return this.api._get('');
  }

  /**
   * Gets the specified record from the Relational Table
   * @param {string} idFieldName name of the field representing the unique identifier (E.g., "id", "email")
   * @param {mixed} idFieldValue value of the identifier field, for the record to get.
   * @return OperationResult
   */
  show(idFieldName, idFieldValue) {
    var record = {
      'record': {
        [idFieldName]: idFieldValue
      }
    };
    return this.api._post('show', [], record);
  }

  /**
   * Adds a record to the Relational Table.
   * @param {object} keyValues a list of field name/values for the record to be updated.
   * @return OperationResult
   */
  create(keyValues) {
    var records = {};
    for (var key in keyValues) {
      records[key] = keyValues[key];
    }
    var requestRecords = {'record': records };
    return this.api._post('create', [], requestRecords);
  }

  /**
   * Updates a record in the Relational Table.
   * @param {object} keyValues a list of field name/values for the record to be updated. NOTE: Any DateTime strings
   * must be in one of three formats: "MM/DD/YYYY", "YYYY-MM-DD", or "YYYY-MM-DDThh:mm:ssTZD".
   * @return OperationResult
   */
  update(keyValues) {
    var records = {};
    for (var key in keyValues) {
      records[key] = keyValues[key];
    }
    var requestRecords = {'record': records };
    return this.api._put('update', [], requestRecords);
  }

  /**
   * Creates or updates a record in the Relational Table.
   * @param {object} keyValues a list of field name/values for the record to be updated. NOTE: Any DateTime strings
   * must be in one of three formats: "MM/DD/YYYY", "YYYY-MM-DD", or "YYYY-MM-DDThh:mm:ssTZD".
   * @return OperationResult
   */
  upsert(keyValues) {
    var records = {};
    for (var key in keyValues) {
      records[key] = keyValues[key];
    }
    var requestRecords = {'record': records };
    return this.api._post('upsert', [], requestRecords);
  }

  /**
   * Deletes the given record of the relational table
   * @param {string} idFieldName name of the field representing the unique identifier (E.g., "id", "email")
   * @param {mixed} idFieldValue value of the identifier field, for the record to get.
   * @return OperationResult
   */
  upsert(idFieldName, idFieldValue) {
    var record = {
      'record': {
        [idFieldName]: idFieldValue
      }
    };
    return this.api._delete('delete', [], null, requestRecords);
  }

  /**
   * @param string|null $overrideResource ignored
   * @return string
   */
  url(overrideResource = null) {
      return 'https://rdb.maropost.com/' + $this.accountId + '/' + this.resource;
  }

  /**
   * Updates/switches which table this service is acting against
   * @param {string} newTableName name of the table to use for successive calls.
   */
  _setTableName(newTableName) { 
    this.resource = newTableName;
  }
  
  /**
   * @return string name of the table this service is acting against.
   */
  _getTableName() {
    return this.resource;
  }
}

module.exports = RelationalTableRows;