/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('image', (table) => {
      table.uuid('image_id').notNullable().primary().unique();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.string('filepath').notNullable().unique();
    })
    .createTable('tag', (table) => {
      table.uuid('tag_id').notNullable().primary().unique();
      table.string('tag_name').notNullable().unique();
    })
    .createTable('image_tag', (table) => {
      table.uuid('image_id').references('image_id').inTable('image').notNullable();
      table.uuid('tag_id').references('tag_id').inTable('tag').notNullable();
      table.primary(['image_id', 'tag_id']);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('image_tag')
    .dropTable('image')
    .dropTable('tag')
};
