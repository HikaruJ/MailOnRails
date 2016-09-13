class UserMailer < ActionMailer::Base
  def send_email(email_params)
    ActionMailer::Base.mail(from: email_params[:from], to: email_params[:to], subject: email_params[:subject], body: email_params[:body], content_type: 'text/html').deliver
  end
end