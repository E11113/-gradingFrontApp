/*jshint sub:true*/
/*jshint asi:true*/

(function () {

	'use strict';

	var myApp = angular.module('pos', [
		'ngAnimate',
		'ngAria',
		'ngMessages',
		'ngMaterial',
		'material.svgAssetsCache',
		'toastr',
		'blockUI',
		'datatables',
		'UtilService'
	]);

	myApp.config(['toastrConfig', 'blockUIConfig',
		function (toastrConfig, blockUIConfig) {


			angular.extend(toastrConfig, {
				autoDismiss: true,
				containerId: 'toast-container',
				maxOpened: 0,
				newestOnTop: true,
				positionClass: 'toast-bottom-right',
				preventDuplicates: false,
				preventOpenDuplicates: true,
				target: 'body'
			});

			blockUIConfig.autoInjectBodyBlock = true;
			blockUIConfig.autoBlock = true;
			blockUIConfig.message = 'Please wait...';

		}]);

	myApp.controller('MainCtrl', ["$scope", "utilService", "DTOptionsBuilder",
		function ($scope, utilService, DTOptionsBuilder) {

			$scope.classes = [];
			$scope.students = [];
			$scope.courses = [];
			$scope.assignments = [];
			$scope.assignmentList = [];
			$scope.questions = [];
			$scope.gradeStatistics = [];
			$scope.questionStatistics = [];

			getClasses();

			function getClasses() {

				utilService.callGetRequest('teacherView/getAllClasses')
					.then(function (response) {

						$scope.classes = response.data;

					}, function (error) { }
					);
			}

			$scope.changeClass = function (selectedClass) {

				$scope.students = [];
				$scope.assignmentList = [];
				$scope.questions = [];

				utilService.callGetRequest('studentView/getStudentsByClass/' + selectedClass.code)
					.then(function (response) {

						$scope.students = response.data;

					}, function (error) {
					});
			}

			$scope.changeStudent = function (selectedStudent) {

				$scope.assignmentList = [];
				$scope.questions = [];

				utilService.callGetRequest('studentView/getTakenAssignmentsByStudent/' + selectedStudent.regNo)
					.then(function (response) {

						$scope.assignmentList = response.data;

					}, function (error) {
					});
			}

			$scope.getQuestions = function (assignment, student) {

				$scope.questions = [];

				utilService.callGetRequest('studentView/getResultsByAssignment/' + assignment.assCode + "/Student/" + student.regNo)
					.then(function (response) {

						$scope.questions = response.data;

					}, function (error) {
					});
			}

			$scope.reset = function () {
				$scope.courses = [];
				$scope.assignments = [];
				$scope.gradeStatistics = [];
				$scope.questionStatistics = [];
			}

			$scope.changeSearchingClass = function (searchingClass) {

				$scope.courses = [];
				$scope.assignments = [];
				$scope.gradeStatistics = [];
				$scope.questionStatistics = [];

				utilService.callGetRequest('teacherView/getCoursesByClass/' + searchingClass.code)
					.then(function (response) {

						$scope.courses = response.data;

					}, function (error) {
					});
			}

			$scope.changeSearchingCourse = function (searchingCourse, searchGrade) {

				$scope.gradeStatistics = [];
				$scope.questionStatistics = [];

				if (!searchGrade) {

					$scope.assignments = [];

					utilService.callGetRequest('teacherView/getAssignmentByCourse/' + searchingCourse.code)
						.then(function (response) {

							$scope.assignments = response.data;

						}, function (error) {
						});
				}
			}

			$scope.changeAssignment = function(){

				$scope.gradeStatistics = [];
				$scope.questionStatistics = [];
			}

			$scope.searchGrades = function (searchingClass, searchingCourse) {

				var url = 'teacherView/getGradeDetailsByClass/';
				$scope.gradeStatistics = [];

				if (searchingCourse) {
					url += searchingClass.code + '/Course/' + searchingCourse.code;
				}
				else {
					url += searchingClass.code;
				}

				utilService.callGetRequest(url)
					.then(function (response) {

						$scope.gradeStatistics = response.data;

					}, function (error) {
					});
			}

			$scope.searchQuestions = function (searchingAssignment) {

				$scope.questionStatistics = [];

				utilService.callGetRequest('teacherView/getQuestionStatisticsByAssignment/' + searchingAssignment.code)
					.then(function (response) {

						$scope.questionStatistics = response.data;

					}, function (error) {
					});
			}

			$scope.dtInstance = {};

			$scope.dtOptions = DTOptionsBuilder.newOptions()
				.withDisplayLength(50)
				.withOption('dom', 't')
				.withOption('columnDefs', [
					{
						targets: 0,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 1,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 2,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 3,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 4,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 5,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 6,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 7,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					}
				]);

			$scope.dtInstance1 = {};

			$scope.dtOptions1 = DTOptionsBuilder.newOptions()
				.withDisplayLength(50)
				.withOption('dom', 't')
				.withOption('columnDefs', [
					{
						targets: 0,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 1,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 2,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					}
				]);

			$scope.dtInstance2 = {};

			$scope.dtOptions2 = DTOptionsBuilder.newOptions()
				.withDisplayLength(50)
				.withOption('dom', 't')
				.withOption('columnDefs', [
					{
						targets: 0,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 1,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 2,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 3,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					},
					{
						targets: 4,
						responsivePriority: 0,
						filterable: false,
						sortable: false
					}
				]);

		}]);

}());



