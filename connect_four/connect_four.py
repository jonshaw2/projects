player_one=[]
player_two=[]
turn = 1
# 8 down, 8 right
connect_four_board=[["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"],
                    [" 1 "," 2 "," 3 "," 4 "," 5 "," 6 "," 7 "," 8 "]]

print "\n"*2
board = ""

def print_board():
    for i in range(len(connect_four_board)):
        board = ""
        for j in connect_four_board[i]:
            board = board + j
        print board

connect_four_board[0][7]="[X]"
print_board()
while True:
    if turn == 1:
        position = "something"
