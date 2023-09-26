const RegionalDex: { [townName: string]: Array<number> } = {};


RegionalDex[GameConstants.Region.kanto.toString()] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151];
RegionalDex[GameConstants.Region.johto.toString()] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251];
RegionalDex[GameConstants.Region.hoenn.toString()] = [25, 26, 27, 28, 37, 38, 39, 40, 41, 42, 43, 44, 45, 54, 55, 63, 64, 65, 66, 67, 68, 72, 73, 74, 75, 76, 81, 82, 84, 85, 88, 89, 100, 101, 109, 110, 111, 112, 116, 117, 118, 119, 120, 121, 127, 129, 130, 169, 170, 171, 172, 174, 177, 178, 182, 183, 184, 202, 203, 214, 218, 219, 222, 227, 230, 231, 232, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386];
/*
    7 Generation IV Pokémon are still excluded from the Sinnoh Pokédex in Pokémon Platinum: Heatran, Regigigas, Cresselia, Phione, Darkrai, Shaymin, and Arceus. source: bulbapedia
*/
RegionalDex[GameConstants.Region.sinnoh.toString()] = [25, 26, 35, 36, 41, 42, 54, 55, 63, 64, 65, 66, 67, 68, 72, 73, 74, 75, 76, 77, 78, 81, 82, 92, 93, 94, 95, 108, 111, 112, 113, 114, 118, 119, 122, 123, 125, 126, 129, 130, 133, 134, 135, 136, 137, 143, 163, 164, 169, 172, 173, 175, 176, 183, 184, 185, 190, 193, 194, 195, 196, 197, 198, 200, 201, 203, 207, 208, 212, 214, 215, 220, 221, 223, 224, 226, 228, 229, 233, 239, 240, 242, 265, 266, 267, 268, 269, 278, 279, 280, 281, 282, 298, 299, 307, 308, 315, 333, 334, 339, 340, 349, 350, 355, 356, 357, 358, 359, 361, 362, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 487, 490];
RegionalDex[GameConstants.Region.unova.toString()] = [19, 20, 27, 28, 35, 36, 37, 38, 39, 40, 41, 42, 54, 55, 58, 59, 81, 82, 86, 87, 88, 89, 95, 108, 109, 110, 114, 120, 121, 125, 126, 127, 131, 132, 133, 134, 135, 136, 169, 173, 174, 179, 180, 181, 183, 184, 191, 192, 193, 196, 197, 206, 207, 208, 213, 214, 215, 220, 221, 222, 223, 224, 225, 226, 227, 239, 240, 246, 247, 248, 278, 279, 287, 288, 289, 298, 299, 300, 301, 304, 305, 306, 315, 320, 321, 322, 323, 325, 326, 328, 329, 330, 333, 334, 335, 336, 337, 338, 341, 342, 343, 344, 351, 353, 354, 357, 359, 363, 364, 365, 374, 375, 376, 406, 407, 415, 416, 418, 419, 425, 426, 427, 428, 436, 437, 447, 448, 451, 452, 453, 454, 455, 458, 461, 462, 463, 465, 466, 467, 469, 470, 471, 472, 473, 476, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649];
RegionalDex[GameConstants.Region.kalos.toString()] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 39, 40, 41, 42, 43, 44, 45, 50, 51, 54, 55, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 79, 80, 81, 82, 83, 84, 85, 90, 91, 92, 93, 94, 95, 100, 101, 102, 103, 104, 105, 108, 111, 112, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 142, 143, 144, 145, 146, 147, 148, 149, 150, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 174, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 193, 194, 195, 196, 197, 198, 199, 202, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 235, 238, 241, 246, 247, 248, 261, 262, 263, 264, 270, 271, 272, 276, 277, 278, 279, 280, 281, 282, 283, 284, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 324, 325, 326, 327, 328, 329, 330, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 352, 353, 354, 358, 359, 360, 366, 367, 368, 369, 370, 371, 372, 373, 396, 397, 398, 399, 400, 406, 407, 412, 413, 414, 415, 416, 417, 418, 419, 425, 426, 430, 433, 434, 435, 438, 439, 441, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 458, 459, 460, 461, 462, 463, 464, 469, 470, 471, 472, 473, 475, 476, 479, 504, 505, 509, 510, 511, 512, 513, 514, 515, 516, 524, 525, 526, 527, 528, 531, 532, 533, 534, 538, 539, 543, 544, 545, 550, 551, 552, 553, 557, 558, 559, 560, 561, 568, 569, 570, 571, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 587, 588, 589, 590, 591, 594, 597, 598, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 631, 632, 633, 634, 635, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721];
RegionalDex[GameConstants.Region.alola.toString()] = [10, 11, 12, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 35, 36, 37, 38, 39, 40, 41, 42, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74, 75, 76, 79, 80, 81, 82, 86, 87, 88, 89, 90, 91, 92, 93, 94, 96, 97, 102, 103, 104, 105, 108, 113, 115, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 147, 148, 149, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 177, 178, 179, 180, 181, 185, 186, 190, 196, 197, 198, 199, 200, 204, 205, 206, 209, 210, 212, 214, 215, 222, 223, 224, 225, 226, 227, 228, 229, 233, 235, 238, 239, 240, 241, 242, 246, 247, 248, 278, 279, 283, 284, 296, 297, 299, 302, 303, 309, 310, 318, 319, 320, 321, 324, 327, 328, 329, 330, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 357, 359, 361, 362, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 408, 409, 410, 411, 422, 423, 424, 425, 426, 427, 428, 429, 430, 438, 439, 440, 443, 444, 445, 446, 447, 448, 456, 457, 458, 461, 462, 463, 466, 467, 470, 471, 474, 476, 478, 506, 507, 508, 524, 525, 526, 546, 547, 548, 549, 550, 551, 552, 553, 559, 560, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 582, 583, 584, 587, 592, 593, 594, 605, 606, 619, 620, 621, 622, 623, 624, 625, 627, 628, 629, 630, 636, 637, 661, 662, 663, 667, 668, 669, 670, 671, 674, 675, 676, 686, 687, 690, 691, 692, 693, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 714, 715, 718, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807];

/*
    Not sure how to handle Galar (and Paldea with DLC) yet
    The base game has around 400 mons which would be in line with the other regions but would also make 2/3 of the pokemon debuffed
    Just going with the base 400 would also leave pokemon like Galarian Slowpoke, Urshifuu, Spectrier and other DLC mons be debuffed in their homeregion
    There are around 80 mons (legendarys, UB and starters) that can be caught in neither DLC but are still tradeable (via HOME) to SwSh. I've added these behind Eternatus #890, not sure what to do with them
    added the ~180 DLC mons after Melmetal #809
    Pokemon might appear twice in the list before it is decided what to do with them
*/
RegionalDex[GameConstants.Region.galar.toString()] = [4, 5, 6, 10, 11, 12, 25, 26, 35, 36, 37, 38, 43, 44, 45, 50, 51, 52, 53, 58, 59, 66, 67, 68, 77, 78, 83, 90, 91, 92, 93, 94, 95, 98, 99, 106, 107, 109, 110, 111, 112, 118, 119, 122, 129, 130, 131, 132, 133, 134, 135, 136, 143, 163, 164, 170, 171, 172, 173, 175, 176, 177, 178, 182, 185, 194, 195, 196, 197, 202, 208, 211, 213, 215, 220, 221, 222, 223, 224, 225, 226, 236, 237, 246, 247, 248, 263, 264, 270, 271, 272, 273, 274, 275, 278, 279, 280, 281, 282, 290, 291, 292, 302, 303, 309, 310, 315, 320, 321, 324, 328, 329, 330, 337, 338, 339, 340, 341, 342, 343, 344, 349, 350, 355, 356, 360, 361, 362, 406, 407, 415, 416, 420, 421, 422, 423, 425, 426, 434, 435, 436, 437, 438, 439, 446, 447, 448, 449, 450, 451, 452, 453, 454, 458, 459, 460, 461, 464, 468, 470, 471, 473, 475, 477, 478, 479, 509, 510, 517, 518, 519, 520, 521, 524, 525, 526, 527, 528, 529, 530, 532, 533, 534, 535, 536, 537, 538, 539, 546, 547, 550, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 568, 569, 572, 573, 574, 575, 576, 577, 578, 579, 582, 583, 584, 588, 589, 592, 593, 595, 596, 597, 598, 599, 600, 601, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 616, 617, 618, 622, 623, 624, 625, 627, 628, 629, 630, 631, 632, 633, 634, 635, 659, 660, 674, 675, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 694, 695, 700, 701, 704, 705, 706, 708, 709, 710, 711, 712, 713, 714, 715, 736, 737, 738, 742, 743, 746, 747, 748, 749, 750, 751, 752, 755, 756, 757, 758, 759, 760, 761, 762, 763, 765, 766, 767, 768, 771, 772, 773, 776, 777, 778, 780, 781, 782, 783, 784, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, /* compatible mons */ 1, 2, 3, 7, 8, 9, 79, 150, 151, 243, 244, 245, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 380, 381, 382, 383, 384, 385, 480, 481, 482, 483, 484, 485, 486, 487, 488, 494, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 649, 716, 717, 718, 719, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, /*dlc mons */ 1, 2, 3, 7, 8, 9, 25, 26, 27, 28, 39, 40, 54, 55, 60, 61, 62, 63, 64, 65, 72, 73, 79, 80, 81, 82, 90, 91, 98, 99, 102, 103, 104, 105, 108, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123, 127, 128, 129, 130, 132, 137, 170, 171, 172, 174, 183, 184, 186, 194, 195, 199, 206, 212, 214, 223, 224, 226, 227, 230, 233, 241, 242, 278, 279, 280, 281, 282, 293, 294, 295, 298, 318, 319, 320, 321, 324, 339, 340, 341, 342, 403, 404, 405, 415, 416, 425, 426, 427, 428, 440, 451, 452, 453, 454, 458, 462, 463, 464, 465, 474, 475, 506, 507, 508, 524, 525, 526, 527, 528, 543, 544, 545, 548, 549, 551, 552, 553, 557, 558, 559, 560, 570, 571, 587, 588, 589, 590, 591, 592, 593, 616, 617, 619, 620, 621, 624, 625, 626, 627, 628, 629, 630, 636, 637, 661, 662, 663, 686, 687, 690, 691, 692, 693, 702, 704, 705, 706, 707, 744, 745, 746, 747, 748, 753, 754, 757, 758, 764, 765, 766, 767, 768, 769, 770, 782, 783, 784, 819, 820, 824, 825, 826, 833, 834, 840, 841, 842, 843, 844, 845, 846, 847, 852, 853, 871, 877, 891, 892, 893, 29, 30, 31, 32, 33, 34, 35, 36, 41, 42, 77, 78, 122, 124, 125, 126, 129, 130, 131, 133, 134, 135, 136, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 169, 173, 196, 197, 213, 215, 220, 221, 225, 238, 239, 240, 246, 247, 248, 263, 264, 302, 303, 304, 305, 306, 333, 334, 339, 340, 343, 344, 345, 346, 347, 348, 349, 350, 359, 361, 362, 363, 364, 365, 369, 371, 372, 373, 374, 375, 376, 377, 378, 379, 436, 437, 439, 442, 443, 444, 445, 446, 447, 448, 459, 460, 461, 466, 467, 470, 471, 473, 478, 531, 532, 533, 534, 546, 547, 550, 554, 555, 564, 565, 566, 567, 574, 575, 576, 577, 578, 579, 582, 583, 584, 588, 589, 595, 596, 597, 598, 607, 608, 609, 613, 614, 615, 616, 617, 621, 622, 623, 631, 632, 633, 634, 635, 638, 639, 640, 696, 697, 698, 699, 700, 703, 708, 709, 712, 713, 714, 715, 751, 752, 778, 781, 819, 820, 821, 822, 823, 829, 830, 831, 832, 835, 836, 837, 838, 839, 850, 851, 854, 855, 856, 857, 858, 859, 860, 861, 862, 866, 871, 872, 873, 874, 875, 876, 877, 878, 879, 885, 886, 887, 894, 895, 896, 897, 898];
/*
    Hisui consists of only 242 Pokemon which is pretty low even with alt mons
    It does have power houses like (Mega) Gyarados, Manaphy, Mega Abomasnow, (Mega) Lucario, Heatran, Togekiss etc which might help
*/
RegionalDex[GameConstants.Region.hisui.toString()] = [25, 26, 35, 36, 37, 38, 41, 42, 46, 47, 54, 55, 58, 59, 63, 64, 65, 66, 67, 68, 72, 73, 74, 75, 76, 77, 78, 81, 82, 92, 93, 94, 95, 100, 101, 108, 111, 112, 113, 114, 122, 123, 125, 126, 129, 130, 133, 134, 135, 136, 137, 143, 155, 156, 157, 169, 172, 173, 175, 176, 185, 190, 193, 196, 197, 198, 200, 201, 207, 208, 211, 212, 214, 215, 216, 217, 220, 221, 223, 224, 226, 233, 234, 239, 240, 242, 265, 266, 267, 268, 269, 280, 281, 282, 299, 315, 339, 340, 355, 356, 358, 361, 362, 363, 364, 365, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 501, 502, 503, 548, 549, 550, 570, 571, 627, 628, 641, 642, 645, 700, 704, 705, 706, 712, 713, 722, 723, 724, 899, 900, 901, 902, 903, 904, 905];
/*
    Same deal as with Galar, the base dex has 400 mons, there are compatible mons (mostly hisui, starter and legendarys) and DLC mons
    there is also a list of compatible mons for DLC2 (including Raging Bolt and the likes) that was probably datamined, i didnt add those mons to the list yet
*/
RegionalDex[GameConstants.Region.paldea.toString()] = [25, 26, 39, 40, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 79, 80, 81, 82, 88, 89, 90, 91, 92, 93, 94, 96, 97, 100, 101, 113, 123, 128, 129, 130, 132, 133, 134, 135, 136, 147, 148, 149, 172, 174, 179, 180, 181, 183, 184, 185, 187, 188, 189, 191, 192, 194, 196, 197, 198, 199, 200, 203, 204, 205, 206, 211, 212, 214, 215, 216, 217, 225, 228, 229, 231, 232, 234, 242, 246, 247, 248, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 296, 297, 298, 302, 307, 308, 316, 317, 322, 323, 324, 325, 326, 331, 332, 333, 334, 335, 336, 339, 340, 353, 354, 357, 361, 362, 370, 371, 372, 373, 396, 397, 398, 401, 402, 403, 404, 405, 415, 416, 417, 418, 419, 422, 423, 425, 426, 429, 430, 434, 435, 436, 437, 438, 440, 442, 443, 444, 445, 447, 448, 449, 450, 453, 454, 456, 457, 459, 460, 461, 462, 470, 471, 475, 478, 479, 548, 549, 550, 551, 552, 553, 570, 571, 574, 575, 576, 585, 586, 590, 591, 594, 602, 603, 604, 610, 611, 612, 613, 614, 615, 624, 625, 627, 628, 633, 634, 635, 636, 637, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 690, 691, 692, 693, 700, 701, 702, 704, 705, 706, 707, 712, 713, 714, 715, 734, 735, 739, 740, 741, 744, 745, 747, 748, 749, 750, 753, 754, 757, 758, 761, 762, 763, 765, 766, 769, 770, 775, 778, 779, 819, 820, 821, 822, 823, 833, 834, 837, 838, 839, 840, 841, 842, 843, 844, 846, 847, 848, 849, 854, 855, 856, 857, 858, 859, 860, 861, 870, 871, 872, 873, 874, 875, 876, 878, 879, 885, 886, 887, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, /* compatible mons */ 4, 5, 6, 26, 27, 28, 37, 38, 50, 51, 52, 53, 58, 59, 74, 75, 76, 79, 80, 88, 89, 100, 101, 110, 128, 144, 145, 146, 150, 151, 155, 156, 157, 194, 195, 199, 211, 215, 382, 383, 384, 385, 387, 388, 389, 390, 391, 392, 393, 394, 395, 480, 481, 482, 483, 484, 485, 487, 488, 489, 490, 491, 492, 493, 501, 502, 503, 549, 550, 570, 571, 628, 641, 642, 645, 648, 650, 651, 652, 653, 654, 655, 656, 657, 658, 703, 705, 706, 713, 719, 720, 721, 722, 723, 724, 801, 810, 811, 812, 813, 814, 815, 816, 817, 818, 863, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 1009, 1010, /* dlc mons */ 23, 24, 25, 26, 27, 28, 35, 36, 37, 38, 56, 57, 58, 59, 60, 61, 62, 69, 70, 71, 74, 75, 76, 92, 93, 94, 109, 110, 129, 130, 143, 161, 162, 163, 164, 167, 168, 172, 173, 185, 186, 190, 193, 194, 195, 206, 207, 214, 215, 218, 219, 220, 221, 228, 229, 234, 261, 262, 270, 271, 272, 273, 274, 275, 280, 281, 282, 283, 284, 299, 313, 314, 325, 326, 339, 340, 341, 342, 349, 350, 355, 356, 358, 361, 362, 396, 397, 398, 401, 402, 403, 404, 405, 417, 424, 433, 436, 437, 438, 443, 444, 445, 446, 447, 448, 461, 469, 472, 473, 475, 476, 477, 478, 532, 533, 534, 540, 541, 542, 548, 549, 550, 580, 581, 602, 603, 604, 607, 608, 609, 619, 620, 624, 625, 629, 630, 703, 704, 705, 706, 708, 709, 714, 715, 736, 737, 738, 741, 742, 743, 744, 745, 749, 750, 753, 754, 757, 758, 778, 782, 783, 784, 819, 820, 833, 834, 840, 841, 842, 845, 846, 847, 856, 857, 858, 859, 860, 861, 876, 877, 901, 902, 924, 925, 948, 949, 962, 968, 969, 970, 979, 982, 983, 1011, 1012, 1013, 1014, 1015, 1016, 1017];


RegionalDex[GameConstants.Region.final.toString()] = [];
RegionalDex[GameConstants.Region.none.toString()] = [];
