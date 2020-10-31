var axios = require('axios');

var config = {
    method: 'get',
    url: 'https://www.dropbox.com/s/ko7s9hcjol24yuz/nowplaying.txt',
    headers: { }
  };

  var config2 = {
    method: 'get',
    url: '',
    headers: { }
  };

var test = async () => {
    var data;
    await axios(config)
    .then(function (response) {
        data = JSON.stringify(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

    var n1 = data.search("preview_url");
    var n2 = data.search("revision_id");
    var str = data.slice(n1+17,n2-7);
    config2.url = str;

    var data2;
    await axios(config2)
    .then(function (response) {
        data2 = response.data;
    })
    .catch(function (error) {
    console.log(error);
    });

    var n3 = data2.search("<span></span>");
    var n4 = data2.search("</pre></div>");
    var str1 = data2.slice(n3+13,n4);
    console.log(str1);

    var lul = str1.split(' - ');
    lul[1] = lul[1].trim();
    console.log(`This is ${lul[1]} by ${lul[0]}`);
    return str1;
}

test();

