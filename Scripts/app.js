var TodoApp = angular.module("TodoApp", ["ngResource", "ngRoute"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'details.html' }).
            when('/edit/:editID', { controller: EditCtrl, templateUrl: 'details.html' }).
            when('/graph', { controller:    GraphCtrl, templateUrl: 'graph.html' }).
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


