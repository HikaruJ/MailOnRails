class UserMailer < ActionMailer::Base
  def send_email(email_params)
    scrubber = Rails::Html::PermitScrubber.new
    scrubber.tags = ['a', 'b', 'div', 'p', 'li', 'ul', 'ol', 'i', 'u']

    html_fragment = Loofah.fragment(email_params[:body])
    html_fragment.scrub!(scrubber)
    @body = html_fragment.to_s

    ActionMailer::Base.mail(from: email_params[:from], to: email_params[:to], subject: email_params[:subject], body: @body, content_type: 'text/html').deliver
  end
end