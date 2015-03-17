var mocha = require('mocha'),
    chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;

//--- your setup code goes here (i.e. create test instances of your Constructors)
// var Person = require('../Person.js').Person;
//--- your setup code goes above here

var _ = require('lodash')
var Backbone = require('backbone')
var TemplateView = require('../TemplateView.js')
var Todo = require('../todo')


//--- your tests go here

describe('Todo', function() {

		describe('Backbone.TodoItem', function() {
				it('should have defaults', function() {
						expect(new Backbone.TodoItem())
						.to.have.property('attributes') /* subject of tests changes to 'attributes' */
						.to.have.ownProperty('title')
						.to.have.ownProperty('completed')
						.to.have.ownProperty('urgent')
						.to.have.ownProperty('dueDate')
				})

				it('should set new attributes', function() {
						var item = new Backbone.TodoItem()
						item.set('title', 'go to the store')
						expect(item.get('title')).to.equal('go to the store')
						item.set('china', 'yes')
						expect(item.get('china')).to.equal('yes')
				})
		});




		describe('Backbone.TodoList', function() {
				var list = new Backbone.TodoList([
							new Backbone.TodoItem({title: 'lkasd'}),
							new Backbone.TodoItem({title: 'askldgh'})
							])

				it('should create models when they\'re passed in', function() {
						expect(list.models).to.contain.instanceof(Object)
						expect(list.models).to.have.length.least(1)
				})

				describe('#comparator', function() {
						var model1 = new Backbone.TodoItem({title: '1', completed: false})
						var model2 = new Backbone.TodoItem({title: '2', completed: true})
						var list = new Backbone.TodoList([model1, model2])

						it('should return a number', function() {
								expect(list.comparator(model1, model2)).to.be.a('number').that.equals(-1)
								expect(list.comparator(model2, model1)).to.equal(1)
						})
				})
		})





		describe('Backbone.TodoRouter', function() {

				var router = new Backbone.TodoRouter()

				describe('#initialize', function() {
						it('should give the router a collection', function() {
								expect(router).to.have.property('collection')
								.is.instanceof(Backbone.Collection)
						})
				})

				describe('#routes', function() {
						it('should have routes', function() {
								expect(router.routes).to.be.an('object')
						})

						it('should have a default route', function() {
								expect(router.routes).to.have.property('*default')
						})
				})

				describe('#itemDetails', function() {
						it('should filter out an item', function() {
								expect(router.itemDetails('Shower')).to.be.instanceof(Backbone.Model)
								.and.have.property('attributes')
								.and.have.property('title', 'Shower')
								expect(router.itemDetails('Groceries')).to.be.instanceof(Backbone.Model)
								.and.have.property('attributes')
								.and.have.property('title', 'Groceries')
								expect(router.itemDetails('Shower').get('editable')).to.equal(false)
						})
				})

		})


});