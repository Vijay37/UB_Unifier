# Librarires Import
import urllib2
import csv
from bs4 import BeautifulSoup
import datetime
from datetime import datetime
from selenium import webdriver
url = "https://calendar.buffalo.edu/";  # URL Page from where we are scraping
browser = webdriver.PhantomJS(); # webdriver to load the data properly
browser.get(url);
html = browser.page_source;
#
soup = BeautifulSoup(html, 'lxml');
articles = soup.findAll('section',{'class':'list-event-preview'});
events_date = []
events_name = []
events_desc=[]
start_times=[]
end_times=[]
dates=[]
links=[]
categories=[]
counts=[]
count=1;
for article in articles:
    p = article.find('p');
    text = p.get_text();
    text = text.replace(" ","");
    text = text.replace("\n","");
    arr = text.split(",");
    if len(arr)<2:
        continue;
    date=arr[0];
    print(date);
    # date=datetime.strptime(date, '%m/%d/%y').strftime('%Y-%m-%d')
    if "AllDay" in arr[1]:
        start='00:00';
        end='23:59';
    else:
        times=arr[1].replace("(ET)","");
        time_arr=times.split("-");
        start=time_arr[0];
        if len(time_arr)<2:
            end=None;
        else:
            end=time_arr[1];
            in_time = datetime.strptime(end, "%I:%M%p")
            out_time = datetime.strftime(in_time, "%H:%M")
            end=out_time;
        in_time = datetime.strptime(start, "%I:%M%p")
        out_time = datetime.strftime(in_time, "%H:%M")
        start=out_time;
    dates.append(date);
    start_times.append(start);
    end_times.append(end);
    events_name.append(article.find('h3').get_text());
    events_desc.append(None);
    categories.append(None);
    counts.append(count);
    count=count+1;
    a = article.find('a');
    links.append(a['href'])
wtr = csv.writer(open ('events.csv', 'a'), delimiter=',', lineterminator='\n')
for a,b,c,d,e,f,g,h,i in zip(counts,events_name, events_desc,start_times,end_times,dates,categories,categories,links):
    wtr.writerow ([a,b,c,d,e,f,g,h,i])
