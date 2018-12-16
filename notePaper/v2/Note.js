export default function Note (title) {
    this.id = '';
    this.title = title;
    this.desc = '';
    this.date = '';
  }
  Note.method('setId', function () {
    var id = new Date();
    this.id = 'note' + id.getTime();
  })
  Note.method('getId', function () {
    return this.id;
  })
  Note.method('setTitle', function (title) {
    this.title = title;
  })
  Note.method('getTitle', function () {
    return this.title;
  })
  Note.method('setTitle', function (title) {
    this.title = title;
  })
  Note.method('getTitle', function () {
    return this.title;
  })
  Note.method('setDesc', function (desc) {
    this.desc = desc;
  })
  Note.method('getDesc', function () {
    return this.desc;
  })
  Note.method('setDate', function (date) {
    this.date = date;
  })
  Note.method('getDate', function () {
    return this.date;
  })