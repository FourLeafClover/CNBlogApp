import { LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ConstValue } from '../service/constValue';
import { CookieService } from '../service/cookie';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

    private headers: any;
    private defaultOptions: any;

    constructor(private http: Http, public loadingCtrl: LoadingController, private constValue: ConstValue, private cookie: CookieService) {
        this.headers = new Headers();
        this.defaultOptions = {
            isAuth: true,
            isShowLoading: true,
            baseUrl: this.constValue.getConfig().blogAuthBaseApi
        };
    }

    getAuthToken(callback: Function) {

        this.cookie.setCookie('authToken', 'NOAddZH5AdApSyv8FNu5cl-1zGmFuVqfaHw8Zpi03cG0DZAqQ7Nu7Hfe8zrICAVcaks_bvlPUF_SfD1pHvbIy9bRGmnhuoBCyZpCtAK4TspBkamV-hSnxsuW4T2ztWdtdrVp2SXZrhNE4Mm_3NrXzOYvV_jZaI-0VJZ6Z5qfjPWoh8Ui8xPEFdcqA-5kPdZk6AgZFLP6UoPKSUs31PoiDw', 0);
        let authToken = this.cookie.getCookie('authToken');
        if (authToken) {
            if (callback) {
                callback();
            }
        } else {
            let header = new Headers();
            header.append('Content-Type', 'application/x-www-form-urlencoded');
            header.append('Authorization', 'Basic ZjAwNDk0ZGItOTJlYy00NWJlLTg4ZDUtMDQ1YjgwZjBjNjExOnUwTVV2dWpoSzdubFA2bkZvQVhLbHpURi1yWThITng4Qi02ZVBhWWQ0akMySE5WZEVKSXg2bWptdHhhb1dMTHBEejNUMVdEb1VrMFRCdUww');
            let body = 'grant_type=client_credentials';
            this.http.post('https://api.cnblogs.com/token', body, {
                headers: header
            }).subscribe((result: any) => {
                if (result != null) {
                    let tokenInfo = JSON.parse(result._body);
                    if (tokenInfo) {
                        this.cookie.setCookie('authToken', tokenInfo.access_token, Number(tokenInfo.expires_in) - 10);
                    }
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }

    setAuthToken(callback: Function) {

        this.getAuthToken(() => {
            let authToken = this.cookie.getCookie('authToken');
            this.headers = new Headers();
            this.headers.append('Authorization', `Bearer ${authToken}`);
            if (callback) {
                callback();
            }
        });
    }

    extends(defaultOptions, options) {
        Object.keys(defaultOptions).forEach((key) => {
            if (options[key] === undefined || options[key] == null || options[key].length == "") {
                options[key] = defaultOptions[key];
            }
        });
    }

    get(options: any, callback = null) {

        this.extends(this.defaultOptions, options);
        this.setAuthToken(() => {
            this.headers.append('Content-Type', 'application/json');
            let loading = null;
            if (options.isShowLoading) {
                loading = this.loadingCtrl.create({
                    content: '',
                });
                loading.present();
            }

            if (loading) {
                setTimeout(function () {
                    loading.dismiss();
                }, 2000);
            }

            this.http.get(options.baseUrl + options.url, {
                headers: this.headers
            }).subscribe((result: any) => {
                if (result.status == 200) {
                    callback(JSON.parse(result._body));
                    if (loading) {
                        loading.dismiss();
                    }
                }
            })
        })
    }
}