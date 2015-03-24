


var TodoApp = angular.module("TodoApp", ["ngResource", "ngRoute", 'googlechart']).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'details.html' }).
            when('/edit/:editID', { controller: EditCtrl, templateUrl: 'details.html' }).
            when('/test', { controller: TestCtrl, templateUrl: 'test.html' }).
          
            otherwise({ redirectTo: '/' });
    });

TodoApp.factory('Todo', function ($resource) {
    return $resource('/api/Todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

//var ListCtrl = function ($scope, $location, Todo) {
//    $scope.todos = Todo.query();
//};


var CreateCtrl = function ($scope, $location, Todo) {
    $scope.action = "Add";
    $scope.save = function () {

        Todo.save($scope.todo, function () {

            $location.path('/');


        }


            );

    }

};

var GraphCtrl = function ($scope, $location, Todo) {
    debugger;

};

var EditCtrl = function ($scope, $location, $routeParams, Todo) {

    $scope.action = "Update";
    var id = $routeParams.editID;

    $scope.todo = Todo.get({ id: id });

    $scope.save = function () {

        Todo.update({ id: id }, $scope.todo, function () {
            $location.path('/');
        }
            
            );

    };
   
};

var ListCtrl = function ($scope, $location, Todo) {
    $scope.search = function () {

        //$scope.todos =

        Todo.query({
            q: $scope.query,
            sort: $scope.sort_order,
            desc: $scope.is_desc,
            offset: $scope.offset,
            limit: $scope.limit
        
        },

            function(data){
                $scope.more = data.length == 20;
                $scope.todos = $scope.todos.concat(data);

            });
        };

       

   

    $scope.sort = function (col) {
       
        if ($scope.sort_order == col) {
            $scope.is_desc = !$scope.is_desc


        } else {

            $scope.sort_order = col;

        };


        $scope.do_show = function (asc, col) {
            return (asc != $scope.is_desc) && ($scope.sort_order == col);
        };

        $scope.reset();

    };

    $scope.show_more = function () {
        debugger;
        $scope.offset += $scope.limit;
        $scope.search();
    };

    $scope.has_more = function () {
        return $scope.more;
       
    };

    $scope.reset = function () {
      

    
        $scope.limit = 20;
        $scope.offset = 0;
        $scope.todos = [];
        $scope.more = true;
        $scope.search();
    };

    $scope.delete = function () {

        var id = this.todo.Id;
        Todo.delete({ id: id }, function () {

            $("#todo_" + id).fadeOut();

        });

    };

    $scope.sort_order = "Priority";
    $scope.is_desc = false;


    $scope.reset();


    };

var TestCtrl = function ($scope, $location, Todo) {
    angular.module('TodoApp', ['googlechart'])

    var chart1 = {};
    chart1.type = "google.visualization.BarChart";
    chart1.displayed = false;
    chart1.data = {
        "cols": [{
            id: "month",
            label: "Month",
            type: "string"
        }, {
            id: "laptop-id",
            label: "Laptop",
            type: "number"
        }, {
            id: "desktop-id",
            label: "Desktop",
            type: "number"
        }, {
            id: "server-id",
            label: "Server",
            type: "number"
        }, {
            id: "cost-id",
            label: "Shipping",
            type: "number"
        }],
        "rows": [{
            c: [{
                v: "2014"
            }, {
                v: 19,
                f: "42 items"
            }, {
                v: 12,
                f: "Ony 12 items"
            }, {
                v: 7,
                f: "7 servers"
            }, {
                v: 4
            }]
        }

        , {
            c: [{
                v: "2013"
            }, {
                v: 13
            }, {
                v: 1,
                f: "1 unit (Out of stock this month)"
            }, {
                v: 12
            }, {
                v: 2
            }]
        }
        
        , {
            c: [{
                v: "2012"
            }, {
                v: 24
            }, {
                v: 5
            }, {
                v: 11
            }, {
                v: 6
            }

           ]
        }]
    };

    chart1.options = {
        "title": "Performance",
        "series": {
            0: { color: '#004225' },
            1: { color: 'green' },
            2: { color: '#C80000' },
            3: { color: '#E6B800' },
            
   
        },

        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Sales unit",
            "gridlines": {
                "count": 10
            }
        },
        "hAxis": {
            "title": "Date"
        }
    };
    $scope.myChart = chart1;


};






  //  angular.module('TodoApp', ['googlechart'])
  //.controller('myController', function ($scope) {
  //    var chart1 = {};
  //    chart1.type = "google.charts.Bar";
  //    chart1.displayed = false;
  //    chart1.data = {
  //        "cols": [{
  //            id: "month",
  //            label: "Month",
  //            type: "string"
  //        }, {
  //            id: "laptop-id",
  //            label: "Laptop",
  //            type: "number"
  //        }, {
  //            id: "desktop-id",
  //            label: "Desktop",
  //            type: "number"
  //        }, {
  //            id: "server-id",
  //            label: "Server",
  //            type: "number"
  //        }, {
  //            id: "cost-id",
  //            label: "Shipping",
  //            type: "number"
  //        }],
  //        "rows": [{
  //            c: [{
  //                v: "January"
  //            }, {
  //                v: 19,
  //                f: "42 items"
  //            }, {
  //                v: 12,
  //                f: "Ony 12 items"
  //            }, {
  //                v: 7,
  //                f: "7 servers"
  //            }, {
  //                v: 4
  //            }]
  //        }, {
  //            c: [{
  //                v: "February"
  //            }, {
  //                v: 13
  //            }, {
  //                v: 1,
  //                f: "1 unit (Out of stock this month)"
  //            }, {
  //                v: 12
  //            }, {
  //                v: 2
  //            }]
  //        }, {
  //            c: [{
  //                v: "March"
  //            }, {
  //                v: 24
  //            }, {
  //                v: 5
  //            }, {
  //                v: 11
  //            }, {
  //                v: 6
  //            }

  //            ]
  //        }]
  //    };

  //    chart1.options = {
  //        "title": "Sales per month",
  //        "isStacked": "true",
  //        "fill": 20,
  //        "displayExactValues": true,
  //        "vAxis": {
  //            "title": "Sales unit",
  //            "gridlines": {
  //                "count": 10
  //            }
  //        },
  //        "hAxis": {
  //            "title": "Date"
  //        }
  //    };
  //    $scope.myChart = chart1;
  //})

  //      .value('googleChartApiConfig', {
  //    version: '1.1',
  //    optionalSettings: {
  //        packages: ['bar'],
  //        language: 'en'
  //    }
  //});

