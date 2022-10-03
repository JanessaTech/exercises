import enums.RoleGroupTimeSearchType

import java.text.SimpleDateFormat
import java.util.stream.Stream

class Test {
    static void main(def args){
        def team_domain = 'jane'
        def cert_url_template = 'https://%s/cdn-cgi/access/certs'

        def cert_url = String.format(cert_url_template, team_domain)
        println(cert_url)
    }
}
