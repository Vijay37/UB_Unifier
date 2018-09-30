# Librarires Import
import urllib2
import csv
from bs4 import BeautifulSoup
from selenium import webdriver
url = "https://buffalo.campuslabs.com/engage/events";  # URL Page from where we are scraping
browser = webdriver.PhantomJS(); # webdriver to load the data properly
browser.get(url);
html = browser.page_source;
#
soup = BeautifulSoup(html, 'lxml');
divs = soup.findAll('div',{'id':'event-discovery-list'});
parent_div = divs[0];
divs = parent_div.findAll('a')
count=0
events=[]
dates=[]
clubs=[]
for div in divs:
    event = div.find('h3').get_text()
    events.append(event)
    club = div.findAll('span')[3].get_text()
    clubs.append(club)
    time = div.get_text().replace(event,"")
    time = time.replace(club,"")
    dates.append(time)
wtr = csv.writer(open ('out_clubs.csv', 'a'), delimiter=',', lineterminator='\n')
for f, b,c in zip(clubs, events,dates):
    wtr.writerow ([f,b,c])
