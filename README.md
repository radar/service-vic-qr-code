A tiny app that takes a Service VIC Checkin QR code and makes it... smaller. Just as a proof-of-concept that a smaller QR code could still work.

I noticed at my local cafe that people were having trouble scanning the QR code. I think this is because of a number of reasons:

1. It's quite a complicated code, containing a lot of information
1. That information is then encoded into a JWT format (because I guess to stop nefarious people just checking in to every location?)
1. People do not stand still when scanning the code with their phone, or they have shaky hands, or potato phones (hi Android peeps) with resolutions measured in kilopixels. Or maybe their smashed avo splattered on the lens... WHO KNOWS.
1. The code is printed on an A4 sheet of paper, limiting the maximum resolution of the code. It could be printed on an A0 sheet of paper and would probably work fine as-is (after all, the posters Service VIC hand out are PDF and therefore can be scaled to any size), but I can understand why my tiny local cafe might not want to do this.

With these constraints in mind, this app generates a _smaller_ QR code from any scanned in code. It will still scan correctly and prompt you to check in to a venue.
