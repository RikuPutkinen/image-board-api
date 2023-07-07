const { Model } = require('objection');
const path = require('path');

class Image extends Model {
  static tableName = 'image';

  static idColumn = 'image_id';

  static get virtualAttributes() {
    return ['image_route', 'thumbnail_route'];
  }

  image_route() {
    return this.filepath.match(/\/uploads.*/)[0];
  }

  thumbnail_route() {
    let route = this.filepath.match(/\/uploads.*/)[0];
    const dir = path.dirname(route);
    const filename = path.basename(route);

    return path.join(dir, `thumbnail_${filename}`);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['image_id', 'filepath'],

      properties: {
        image_id: { type: 'string' },
        filepath: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Tag = require('./tag');
    
    return {
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: 'image.image_id',
          through: {
            from: 'image_tag.image_id',
            to: 'image_tag.tag_id'
          },
          to: 'tag.tag_id'
        }
      }
    }
  }
}

module.exports = Image;