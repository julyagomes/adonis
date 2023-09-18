import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'add_column_token_to_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('token')
    })
  }
}