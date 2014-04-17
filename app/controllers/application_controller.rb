class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  def index
    render('/index.html')
  end

  def thanks
    render('/thank-you.html')
  end

  def submit
    @ordersubmission = params['application'];
    respond_to do |format|
      if params['user'].nil?
        format.json { render :text => "No user specified for this order!", :status => 400 and return false }
      elsif params['hats'].instance_of?(Array) or params['coats'].instance_of?(Array)
        format.json { render :text => "Style data malformed for one or more items. An item with associated style information should be an object with each selected style as the keys, and each quantity as values.", :status => 400 and return false }
      else
        format.json { render :json => @ordersubmission, :status => 200 and return true }

      end
    end
  end


end
