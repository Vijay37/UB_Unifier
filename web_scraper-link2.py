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
parent_div = divs[0]
