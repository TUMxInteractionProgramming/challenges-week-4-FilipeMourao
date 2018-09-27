// fixed variables
var currentChannel;
var currentLocation = {
    latitude : 48.199819, 
    longitude : 11.627553,
    what3words :"chuvarada.aceitam.furar",
}
function Message ( text){
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date();
    this.expiredOn = new Date() ;
    this.expiredOn.setTime(Date.now() + 1000*60*15 ); //  currently date + 15 minutes
    this.own = true;
    this.text = text;
}


/* #6 start the #external #action and say hello */
console.log("App is alive");

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelObject) {
    currentChannel = channelObject;
    channelName = channelObject.name;
    channelLocation = channelObject.createdBy;
    //Log the channel switch
 //   console.log("Tuning in to channel", channelName);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML =  
    'by <a href="http://w3w.co/' + channelLocation + '" target="_blank"><strong>' + channelLocation  + '</strong></a>';

    /* #6 #liking channels on #click */
    //(channelObject.starred) 
 //   console.log("Tuning type", channelObject.starred);
    $('#channel-star')
    .removeClass($('#channel-star').attr('class'))
    .addClass(
        function() {
            if ( channelObject.starred ) {
                return "fas fa-star";
            } else {
                return "far fa-star";
            }
        }
    );

    //   (channelObject.starred) ? 
 //   $('#channel-star')
 //  .removeClass($('#channel-star').attr('class'))
 //   .addClass("fas fa-star")
 //   :
 //   $('#channel-star')
 //   .removeClass($('#channel-star').attr('class'))
 //   .addClass("far fa-star");


//  $('#channel-star')
//   .removeClass($('#channel-star').attr('class'))
//   .addClass($(channelName + " .starClass").attr('class'));

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName + ')').addClass('selected');
}

/* #6 #liking a channel on #click */
function star(id, object) {
   // $('#channel-star').attr('src', 'http://ip.lfe.mw.tum.de/sections/star.png');
   var classType = $(id).attr('class');
   var name = $('#channel-name').html();
   var className;

   object.starred ?  object.starred = false : object.starred = true;
   
   $( id )
   .removeClass(
       function() {
            if ( classType === "fas fa-star" ) {
                return "fas fa-star";
            } else {
                return "far fa-star";
            }
        }
    )
    .addClass(
        function() {
            if ( classType === "fas fa-star" )  {
                return "far fa-star";
            } else {
                return "fas fa-star";
            }
        }
    )
    ;

 //   $('#channel-star')
   // .removeClass("fas fa-star").addClass("far fa-star");

    
    
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}
function sendMessage(id){
    var text = $(id).val();
    $(id).val('');
    text = "Hello Chatter";
    message = new Message(text);
    $('#messages ').append(createMessageElement(message));

}
function createMessageElement(messageObject){
    string = "message";
    var htmlString = '<div class = "message" > '+
    '  <h3><a href= ' +'"' + messageObject.createdBy + '"' + ' target="_blank"><strong>'+ '"'   +messageObject.createdBy + '"'  +'</strong></a>'+
     formatDate(messageObject.createdOn)  + '<em>'+calculateExpiresIn(messageObject.createdOn, messageObject.expiredOn) +' min. left</em></h3>'+
    '<p>'+  '"' + messageObject.text + '"'  +'</p>' +
    '<button>+5 min.</button> </div>';

   // console.log(htmlString);
    
    return htmlString;
}
function formatDate(date) {
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "June", "July",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    var weekDaysNames = [
        "Sun", "Mon", "Tue",
        "Wed", "Thr", "Fri", "Sat",
      ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if(minutes < 10) minutes = '0' + minutes.toString();
  
    return  weekDaysNames[day%7]  + ', ' + monthNames[monthIndex]+ ' ' + day + 'th, ' + hour +':' + minutes;
  }
  function calculateExpiresIn(createdOn, expiredOn) {
    return  Math.round((expiredOn.getTime() - createdOn.getTime() ) /(60*1000));// get the time in milli seconds and take the rest of the integer division to get the minutes
  }
  function listChannels(){
    $('#channels-list').append(createChannelElement(yummy, "'#channelStar1'"));
    $('#channels-list').append(createChannelElement(sevenContinents, "'#channelStar2'"));
    $('#channels-list').append(createChannelElement(killerApp, "'#channelStar3'"));
    $('#channels-list').append(createChannelElement(firstPersonOnMars, "'#channelStar4'"));
    $('#channels-list').append(createChannelElement(octoberfest, "'#channelStar5'"));
  }
  function createChannelElement(channelObject, idStar){
    var starClass = channelObject.starred? "fas fa-star" : "far fa-star";
    objectName = channelObject.name.substring(1, channelObject.name.length);// take the correct name of the object
    firstLetterLowerCase = objectName[0].toLowerCase();
    objectName = firstLetterLowerCase + objectName.slice(1);
    var iconStarId = idStar.substring(2, idStar.length - 1);
    var htmlString = 
    '<li onclick="switchChannel(' + objectName + ')">' + channelObject.name +
    '<span class="channel-meta">'+
        '<i id="'+iconStarId+'" class= '+ '"'+ starClass + '"'+ ' onclick=" '+
         'star(  ' + idStar + ',' + objectName + ')" ></i>' +
        '<i class="fas fa-chevron-right"></i>' + 
    '</span> </li>';
    console.log(htmlString);
    
    return htmlString;
          
}