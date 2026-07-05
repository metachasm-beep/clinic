import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    print("Initializing AI Crawler...")
    urls = [
        "https://www.practo.com/delhi/clinic/get-well-clinic-cr-park",
        "https://www.justdial.com/Delhi/Get-Well-Clinic-Near-Market-Number-2-Chittaranjan-Park/011PXX11-XX11-131109153351-M1S5_BZDET"
    ]
    
    async with AsyncWebCrawler(verbose=True) as crawler:
        for url in urls:
            try:
                print(f"Crawling {url}...")
                result = await crawler.arun(url=url)
                if result.markdown and len(result.markdown) > 100:
                    with open("clinic_data.md", "w", encoding="utf-8") as f:
                        f.write(result.markdown)
                    print("Successfully saved data to clinic_data.md")
                    return # Exit after successful scrape
            except Exception as e:
                print(f"Failed to crawl {url}: {e}")

if __name__ == "__main__":
    asyncio.run(main())
