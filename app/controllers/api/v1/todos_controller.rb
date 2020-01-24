class Api::V1::TodosController < ApplicationController
  def index
    todo =  Todo.all.order(created_at: :asc)
    render json: todo
  end

  def create
    todo = Todo.create!(todo_params)
    if todo
      render json: todo
    else 
      render json: todo.errors
    end
  end

  def show
    if todo
      render json: todo
    else
      render json: todo.errors
    end
  end

  def destroy
    todo&.destroy
    render json: { message: 'Task deleted!' }
  end

  private

  def todo_params
    params.permit(:task, :description)
  end

  def todo
    @todo ||=Todo.find(params[:id])
  end
end
