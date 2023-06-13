/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('image', (table) => {
      table.uuid('image_id').notNullable().primary();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.string('filepath').notNullable();
    })
    .createTable('tag', (table) => {
      table.uuid('tag_id').notNullable().primary();
      table.string('tag_name').notNullable();
    })
    .createTable('image_tag', (table) => {
      table.uuid('image_id').references('image_id').inTable('image').notNullable();
      table.uuid('tag_id').references('tag_id').inTable('tag').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('image')
    .dropTable('tag')
    .dropTable('image_tag')
};
